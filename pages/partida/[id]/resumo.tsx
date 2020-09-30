import React from 'react';

import { ChipFilter } from '@components/ChipFilter';
import { FilterProvider } from '@contexts/filter';
import { FilterSection } from '@components/Filter';
import { FixtureList } from '@components/FixtureList';
import { Layout } from '@components/Layout';
import { SeasonService, SeasonRange } from '@services/season';
import { Swiper } from '@components/SliderSelection';
import { Fixture, FixtureService } from '@services/fixture';
import { MatchFacts } from '@components/MatchFacts';

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

    const next = season.next ? `/partida/${matchFacts.id}/resumo?year=${season.next.year}` : '';
    const previous = season.previous ? `/partida/${matchFacts.id}/resumo?year=${season.previous.year}` : '';

    return (
        <Layout>
            <div>
                <div style={{
                    width: '45%',
                    background: 'var(--white)',
                    borderRight: '1px solid var(--light-effect)',
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
                <div style={{ width: '55%', height: '100%' }}>
                    <MatchFacts {...matchFacts}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const year = context.query.year || (new Date()).getFullYear();

    const seasonService = new SeasonService();
    const { current, next, previous } = await seasonService.getByYear(year);

    const fixtureService = new FixtureService();
    const fixtures = await fixtureService.query({ year: current.year });

    const filters = fixtureService.getTournaments(fixtures).map(({ id, name }) => ({
        key: id,
        label: name
    }));

    const currentFixture = await fixtureService.getById(id);

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
        matchFacts: currentFixture
    };

    return { props };
};

export default Matches;
