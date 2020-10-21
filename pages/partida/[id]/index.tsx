import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import api from '@services/api';
import { ChipFilter } from '@components/ChipFilter';
import { FilterProvider } from '@contexts/filter';
import { FilterSection } from '@components/Filter';
import { FixtureList } from '@components/FixtureList';
import { Layout } from '@components/Layout';
import { SeasonService, SeasonRange } from '@services/season';
import { Swiper } from '@components/SliderSelection';
import MapProvider, { MapContextData } from '@contexts/map';

import { MapWrapper, MapFixtureListWrapper } from '@styles/pages/Main';

const Map = dynamic(() => import('@components/Map'), {
    ssr: false
});

interface MatchesProps {
    season: SeasonRange;
    fixtures: Array<any>;
    matchFacts: any;
    filters: FilterSection
}

const Matches = ({ season, filters, fixtures, matchFacts }: MatchesProps) => {
    const swiperValue = {
        label: season.current.label,
        value: season.current.id
    };

    const next = season.next ? `/?year=${season.next.year}` : '';
    const previous = season.previous ? `/?year=${season.previous.year}` : '';

    const { coordinates } = matchFacts.ground;
    const points = [{ position: coordinates as Coordinates }];

    const mapProviderRef = useRef<MapContextData>(null);
    useEffect(() => {
        const { definePoints, setZoom } = mapProviderRef.current;
        definePoints(points);
        setZoom(17);
    }, [points]);

    return (
        <Layout>
            <div>
                <MapFixtureListWrapper>

                    <div style={{ borderBottom: '1px solid var(--light-effect)', height: '60px' }}>
                        <Swiper value={swiperValue} next={next} previous={previous} />
                    </div>

                    <FilterProvider>
                        <div style={{ display: 'flex', minHeight: '60px', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--light-effect)' }}>
                            <ChipFilter sections={filters}/>
                        </div>
                        <div style={{ maxHeight: 'calc(100% - 120px)', overflow: 'auto' }}>
                            <FixtureList fixtures={fixtures} initialSelected={matchFacts} />
                        </div>
                    </FilterProvider>

                </MapFixtureListWrapper>
                <MapWrapper>
                    <MapProvider ref={mapProviderRef}>
                        <Map />
                    </MapProvider>
                </MapWrapper>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { year: queryYear, id } = context.query;
    const year = queryYear || (new Date()).getFullYear();

    const seasonService = new SeasonService();
    const { current, next, previous } = await seasonService.getByYear(year);

    const { data } = await api.get(`/fixture?year=${current.year}`);

    const filters = {};
    data.fixtures.forEach((fixture) => {
        const { id, name } = fixture.tournament;

        filters[id] = {
            key: id,
            label: name
        };
    });

    const fixtureResponse = await api.get(`fixture/${id}`);

    const props = {
        season: {
            current,
            ...next && { next },
            ...previous && { previous }
        },
        fixtures: data.fixtures,
        filters: {
            Campeonatos: Object.values(filters)
        },
        matchFacts: fixtureResponse.data
    };

    return { props };
};

export default Matches;
