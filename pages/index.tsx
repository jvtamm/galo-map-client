import React from 'react';
import dynamic from 'next/dynamic';

import api from '@services/api';
import { ChipFilter } from '@components/ChipFilter';
import { FilterProvider } from '@contexts/filter';
import { FilterSection } from '@components/Filter';
import { FixtureList } from '@components/FixtureList';
import { Layout } from '@components/Layout';
import { SeasonService, SeasonRange } from '@services/season';
import { Swiper } from '@components/SliderSelection';

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
    // const point = [coordinates.latitude, coordinates.longitude];

    return (
        <Layout>
            <div>
                <div style={{
                    width: '40%',
                    background: 'var(--white)',
                    boxShadow: '5px 0px 20px rgba(0,0,0,.3)',
                    height: '100%'
                }}>

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

                </div>
                <div style={{ width: '60%', height: '100%' }}>
                    <Map points={[coordinates]} />
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const year = context.query.year || (new Date()).getFullYear();

    const seasonService = new SeasonService();
    const { current, next, previous } = await seasonService.getByYear(year);

    const { data } = await api.get(`/fixture?year=${current.year}`);
    const nextFixtureDate = new Date().setHours(0, 0, 0);

    let nextFixture;
    const filters = {};
    data.fixtures.forEach((fixture) => {
        const matchDate = new Date(fixture.matchDate).getTime();

        if (!nextFixture && matchDate > nextFixtureDate) {
            nextFixture = fixture;
        }

        const { id, name } = fixture.tournament;

        filters[id] = {
            key: id,
            label: name
        };
    });

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
        matchFacts: nextFixture || data.fixtures[0]
    };

    return { props };
};

export default Matches;
