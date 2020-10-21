import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';

import MapProvider, { MapContextData } from '@contexts/map';
import api from '@services/api';
import { Fixture, FixtureService } from '@services/fixture';
import { FixtureProps, StadiumPopup } from '@components/StadiumPopup';
import { Layout } from '@components/Layout';
import { Timeline, TimelineItemProps } from '@components/Timeline';
import { TimelineWrapper, DistanceWrapper } from '@styles/pages/Mapa';
import { generateMarker } from '@components/Map/Marker';
import { useModal } from '@hooks/useModal';
import { MatchFacts } from '@components/MatchFacts';
import { SeasonService, Season } from '@services/season';

const Map = dynamic(() => import('@components/Map'), {
    ssr: false
});

const SnakeAnim = dynamic(() => import('components/Map/SnakeAnim'), {
    ssr: false
});

interface MapStatsProps {
    fixtures: Fixture[];
    groundFixtures: any;
    seasons: Season[];
    currentSeason: Season;
}

const markerOptions = {
    small: generateMarker(''),
    large: generateMarker('stadium'),
    breakpoint: 4
};

const Statistics: React.FC<MapStatsProps> = ({ currentSeason, seasons, fixtures, groundFixtures }: MapStatsProps) => {
    const [animating, setAnimating] = useState(false);
    const [timelineItems, setTimelineItems] = useState<TimelineItemProps[]>([]);
    const [groundFixtureMap, setGroundFixtureMap] = useState<FixtureProps[]>([]);
    const [grounds, setGrounds] = useState<Array<any>>([]);
    const [selectedFixture, setSelectedFixture] = useState<Fixture>();
    const [activeTab, setActiveTabs] = useState<string>('summary');

    const { show, RenderModal } = useModal();

    const mapProviderRef = useRef<MapContextData>(null);

    const onPopupItemClick = useCallback(async(id: string) => {
        const fixtureService = new FixtureService();
        const fixture = await fixtureService.getById(id);

        if (fixture) {
            setSelectedFixture(fixture);
            show();
        }
    }, []);

    useEffect(() => {
        const { defineAdditionalPoints, definePoints } = mapProviderRef.current;
        definePoints([]);

        const groundsList = fixtures.map(({ ground }) => ground.coordinates);
        setGrounds(groundsList);

        const initialPoistions = groundsList.slice(0, 2).map(coords => {
            const hash = `${coords.latitude}${coords.longitude}`;
            const marker = {
                ...markerOptions,
                popup: <StadiumPopup fixtures={groundFixtureMap[hash]} onItemClick={onPopupItemClick} />
            };

            return {
                position: coords,
                marker
            };
        });
        defineAdditionalPoints(initialPoistions);

        const currentTimelineItems = fixtures.map((match) => ({
            id: match.id as string,
            matchDate: new Date(match.matchDate),
            ground: (match.ground.nickname || match.ground.name) as string,
            homeTeam: match.homeTeam.team.abbreviation as string,
            awayTeam: match.awayTeam.team.abbreviation as string
        }));

        setTimelineItems(currentTimelineItems);

        const groundMap = { ...groundFixtures };
        Object.keys(groundMap).forEach((key) => {
            groundMap[key] = groundMap[key].map((match) => ({
                id: match.id,
                ground: (match.ground.nickname || match.ground.name) as string,
                homeTeam: {
                    name: match.homeTeam.team.displayName as string,
                    score: match.homeTeam.score
                },
                awayTeam: {
                    name: match.awayTeam.team.displayName as string,
                    score: match.awayTeam.score
                }
            }));
        });

        setGroundFixtureMap(groundMap);
    }, [fixtures, groundFixtures]);

    const onAnimationEnd = () => {
        const {
            definePoints,
            defineAdditionalPoints,
            additionalPoints: locations,
            points: animatedLocations
        } = mapProviderRef.current;

        const lastIndex = locations.length - 1;

        let nonStartinglocations = [...locations];
        if (animatedLocations.length) {
            nonStartinglocations = nonStartinglocations.slice(1, locations.length);
        }

        const newAnimatedLocations = [...animatedLocations, ...nonStartinglocations].map(p => {
            const hash = `${p.position[0]}${p.position[1]}`;

            p.marker = {
                ...markerOptions,
                popup: <StadiumPopup fixtures={groundFixtureMap[hash]} onItemClick={onPopupItemClick} />
            };

            return p;
        });

        const lastPoint = locations[lastIndex];
        defineAdditionalPoints([lastPoint]);
        definePoints(newAnimatedLocations);

        setAnimating(false);
    };

    const onAnimationStart = () => {
        setAnimating(true);
    };

    const onSelectionChange = (index: number, lastIndex: number) => {
        const { definePoints, defineAdditionalPoints, points: animatedLocations } = mapProviderRef.current;

        if (index > lastIndex) { // moving forward
            const currentIndex = animatedLocations.length;
            const newAdditionalPoints = grounds.slice(currentIndex - 1, index + 1).map(coords => {
                const hash = `${coords.latitude}${coords.longitude}`;

                const marker = {
                    ...markerOptions,
                    popup: <StadiumPopup fixtures={groundFixtureMap[hash]} onItemClick={onPopupItemClick} />
                };

                return {
                    position: coords,
                    marker
                };
            });
            defineAdditionalPoints(newAdditionalPoints);
        } else { // moving backwards
            const updatedAnimated = animatedLocations.slice(
                0,
                index + 1
            );
            const updatedLocations = [updatedAnimated[updatedAnimated.length - 1]];

            defineAdditionalPoints(updatedLocations);
            definePoints(updatedAnimated);
        }
    };

    const tabs = [
        {
            handler: () => setActiveTabs('summary'),
            identifier: 'summary',
            name: 'Resumo',
            active: activeTab === 'summary'
        }
    ];

    if (selectedFixture && selectedFixture.details) {
        tabs.push({
            handler: () => setActiveTabs('lineup'),
            identifier: 'lineup',
            name: 'Escalações',
            active: activeTab === 'lineup'
        });
    }

    return (
        <>
            <Layout>
                <div>
                    <div style={{ width: '100%', height: '100%' }}>
                        <div >
                            <Select
                                styles={{ container: styles => ({ ...styles, zIndex: 100000 }) }}
                                defaultValue={{ label: currentSeason.label, value: currentSeason.year }}
                                onChange={(value) => { Router.push(`/mapa?year=${value.value}`); }}
                                options={seasons.map(({ label, year }) => ({ label, value: year }))}
                            />
                        </div>
                        <MapProvider ref={mapProviderRef}>
                            <Map showPolylines={true} style={{ height: 'calc(100% - 40px)' }}>
                                <SnakeAnim
                                    onAnimationStart={onAnimationStart}
                                    onAnimationEnd={onAnimationEnd} />
                                <TimelineWrapper>
                                    <Timeline
                                        selectable={!animating}
                                        items={timelineItems}
                                        onSelectionChange={onSelectionChange}
                                        initialSelectedIndex={timelineItems.length > 1 ? 1 : 0} />
                                </TimelineWrapper>

                                {
                                    mapProviderRef && mapProviderRef.current && (
                                        <DistanceWrapper>
                                            <div>
                                                { Math.round(mapProviderRef.current.distance).toLocaleString('pt')}
                                                <span>km</span>
                                            </div>
                                        </DistanceWrapper>
                                    )
                                }
                            </Map>
                        </MapProvider>
                    </div>
                </div>
            </Layout>
            <RenderModal>
                <MatchFacts fixture={selectedFixture} tabs={tabs} />
            </RenderModal>
        </>
    );
};

export async function getServerSideProps(context) {
    const year = context.query.year || (new Date()).getFullYear();
    console.log(year);

    const seasonService = new SeasonService();
    const seasons = await seasonService.getAllSeasons();

    const { data } = await api.get(`/fixture?year=${year}`);

    const grounds = {};
    data.fixtures.forEach((fixture) => {
        const { coordinates } = fixture.ground;
        const { latitude, longitude } = coordinates;
        const hash = `${latitude}${longitude}`;

        if (hash in grounds) {
            grounds[hash].push(fixture);
        } else {
            grounds[hash] = [fixture];
        }
    });

    const props = {
        fixtures: data.fixtures,
        groundFixtures: grounds,
        currentSeason: seasons.find(({ year: seasonYear }) => seasonYear === parseInt(year)),
        seasons: seasons.sort((a, b) => b.year - a.year)
        // curent: nextFixture || data.fixtures[0]
    };

    return { props };
};

export default Statistics;
