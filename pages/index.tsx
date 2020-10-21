import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// import api from '@services/api';
import { ChipFilter } from '@components/ChipFilter';
import { FilterProvider } from '@contexts/filter';
import { FilterSection } from '@components/Filter';
import { FixtureList } from '@components/FixtureList';
import { Layout } from '@components/Layout';
import { SeasonService, SeasonRange } from '@services/season';
import { Swiper } from '@components/SliderSelection';
import { Coordinates } from '@components/Map';
import MapProvider, { MapContextData } from '@contexts/map';
import { Fixture, FixtureService } from '@services/fixture';
// import { MatchFacts } from '@components/MatchFacts';
// import { Lineup } from '@components/Lineup';
// import { MatchHeader } from '@components/MatchHeader';
// import { MatchEvents } from '@components/MatchEvents';

import { MapWrapper, MapFixtureListWrapper } from '@styles/pages/Main';

const Map = dynamic(() => import('@components/Map'), {
    ssr: false
});

interface MatchesProps {
    season: SeasonRange;
    fixtures: Fixture[];
    matchFacts: Fixture;
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
        const { definePoints } = mapProviderRef.current;
        definePoints(points);
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
                            <ChipFilter sections={filters} />
                        </div>
                        <div style={{ maxHeight: 'calc(100% - 120px)', overflow: 'auto' }}>
                            <FixtureList fixtures={fixtures} initialSelected={matchFacts} />
                        </div>
                    </FilterProvider>
                    {/* <MatchHeader />
                    <MatchEvents /> */}
                    {/* <Lineup /> */}
                    {/* <MatchFacts {...fixtures[12]}/> */}
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
    const year = context.query.year || (new Date()).getFullYear();

    const seasonService = new SeasonService();
    const { current, next, previous } = await seasonService.getByYear(year);

    const fixtureService = new FixtureService();
    const fixtures = await fixtureService.query({ year: current.year });
    const nextFixture = fixtureService.getNextMatch(fixtures);

    const filters = fixtureService.getTournaments(fixtures).map(({ id, name }) => ({
        key: id,
        label: name
    }));

    const props = {
        season: {
            current,
            ...next && { next },
            ...previous && { previous }
        },
        fixtures: fixtures,
        filters: {
            Campeonatos: filters
        },
        matchFacts: nextFixture || fixtures[0]
    };

    return { props };
};

export default Matches;
