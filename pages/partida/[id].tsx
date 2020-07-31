import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { Layout } from '@components/Layout';
import Chip from '@components/Chip';
import { Swiper } from '@components/SliderSelection';
import { Filter, FilterSection } from '@components/Filter';
import { useFilters, FilterProvider } from '@contexts/filter';
import { Fixture } from '@components/Fixture';
import { SeasonService, SeasonRange } from '@services/season';
import api from '@services/api';

const Map = dynamic(() => import('@components/Map'), {
    ssr: false
});

interface FiltersProps {
    sections: FilterSection;
    children?: React.ReactNode,
}

const Filters: React.FC<FiltersProps> = ({ sections }: FiltersProps) => {
    const { filters, removeFilter } = useFilters();

    const ChipWrapper = styled.div`
        display: inline-flex;
        flex-wrap: wrap;

        & > div {
            margin: 6px;
            margin-left: 0%;
        }
    `;

    return (
        <div style={{ display: 'flex', minHeight: '60px', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--light-effect)' }}>
            <div style={{ marginRight: '32px' }}>
                <Filter sections={sections} />
            </div>
            <ChipWrapper>
                {
                    filters.map(({ key, label }) => <Chip color="success" key={key} text={label} handleClose={() => removeFilter(key)} />)
                }
            </ChipWrapper>
        </div>
    );
};

interface FixtureListProps {
    fixtures: Array<any>;
    initialSelected: any;
    children?: React.ReactNode;
}

const FixtureList: React.FC<FixtureListProps> = ({ fixtures, initialSelected }: FixtureListProps) => {
    const { filters, includes } = useFilters();

    const filteredFixtures = filters.length === 0 ? fixtures : fixtures.filter(({ tournament }) => includes(tournament.id));

    return (
        <>
            {filteredFixtures.map((fixture) => {
                const anchor = `/partida/${fixture.id}`;
                const redirect = {
                    url: anchor,
                    keepParams: true
                };

                const fixtureProp = { ...fixture, redirect };

                return <Fixture {...fixtureProp} active={fixture.id === initialSelected.id} key={fixture.id} />;
            })}
        </>
    );
};

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
    const point = [coordinates.latitude, coordinates.longitude];

    return (
        <Layout>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{
                    width: '40%',
                    background: 'var(--white)',
                    boxShadow: '5px 0px 20px rgba(0,0,0,.3)',
                    height: '100%'
                }}>

                    <div style={{ borderBottom: '1px solid var(--light-effect)', height: '60px' }}>
                        {/* <Swiper options={swiperOptions} initialValue={initialSeason?.value} onChange={redirect} /> */}
                        <Swiper value={swiperValue} next={next} previous={previous} />
                    </div>

                    <FilterProvider>
                        <Filters sections={filters} />
                        <div style={{ maxHeight: 'calc(100% - 120px)', overflow: 'auto' }}>
                            <FixtureList fixtures={fixtures} initialSelected={matchFacts} />
                        </div>
                    </FilterProvider>

                </div>
                <div style={{ width: '60%', height: '100%' }}>
                    <Map point={point} />
                </div>
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
