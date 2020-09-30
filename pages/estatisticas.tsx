import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';

import api from '@services/api';
import { Layout } from '@components/Layout';
import { Timeline, TimelineItemProps } from '@components/Timeline';
import { TimelineWrapper, DistanceWrapper } from '@styles/pages/Estatisticas';
import MapProvider, { MapContextData } from '@contexts/map';
import { generateMarker } from '@components/Map/Marker';
import { FixtureProps, StadiumPopup } from '@components/StadiumPopup';

const Map = dynamic(() => import('@components/Map'), {
    ssr: false
});

const SnakeAnim = dynamic(() => import('components/Map/SnakeAnim'), {
    ssr: false
});

interface MapStatsProps {
    fixtures: Array<any>;
    groundFixtures: any;
}

const markerOptions = {
    small: generateMarker(''),
    large: generateMarker('stadium'),
    breakpoint: 4
};

const Statistics: React.FC<MapStatsProps> = ({ fixtures, groundFixtures }: MapStatsProps) => {
    const [animating, setAnimating] = useState(false);
    const [timelineItems, setTimelineItems] = useState<TimelineItemProps[]>([]);
    const [groundFixtureMap, setGroundFixtureMap] = useState<FixtureProps[]>([]);
    const [grounds, setGrounds] = useState<Array<any>>([]);

    const mapProviderRef = useRef<MapContextData>(null);

    useEffect(() => {
        const { defineAdditionalPoints } = mapProviderRef.current;

        const groundsList = fixtures.map(({ ground }) => ground.coordinates);
        setGrounds(groundsList);

        const initialPoistions = groundsList.slice(0, 2).map(coords => {
            const hash = `${coords.latitude}${coords.longitude}`;
            const marker = {
                ...markerOptions,
                popup: <StadiumPopup fixtures={groundFixtureMap[hash]} />
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
    }, []);

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
                popup: <StadiumPopup fixtures={groundFixtureMap[hash]} />
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
                    popup: <StadiumPopup fixtures={groundFixtureMap[hash]} />
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

    return (
        <Layout>
            <div>
                <div style={{ width: '100%', height: '100%' }}>
                    <MapProvider ref={mapProviderRef}>
                        <Map showPolylines={true}>
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
                                        {/* {console.log(mapProviderRef.current)} */}
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
    );
};

export async function getServerSideProps(context) {
    const year = context.query.year || (new Date()).getFullYear();

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
        groundFixtures: grounds
        // curent: nextFixture || data.fixtures[0]
    };

    return { props };
};

export default Statistics;
