import React, { useEffect } from 'react';

import { ChipFilter } from '@components/ChipFilter';
import { FilterProvider } from '@contexts/filter';
import { FilterSection } from '@components/Filter';
import { FixtureList } from '@components/FixtureList';
import { Layout } from '@components/Layout';
import { SeasonService, SeasonRange } from '@services/season';
import { Swiper } from '@components/SliderSelection';
import { Fixture, FixtureService } from '@services/fixture';
import { MatchFacts } from '@components/MatchFacts';
import { useRouter } from 'next/router';

import { DetailsWrapper, DetailsFixtureListWrapper } from '@styles/pages/Main';

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

    const next = season.next ? `/partida/${matchFacts.id}/escalacoes?year=${season.next.year}` : '';
    const previous = season.previous ? `/partida/${matchFacts.id}/escalacoes?year=${season.previous.year}` : '';

    const { query, route, push: pushRoute, replace: replaceRoute } = useRouter();
    delete query.id;

    useEffect(() => {
        if (!matchFacts.details) {
            replaceRoute({
                pathname: `/partida/${matchFacts.id}/resumo`,
                query
            });
        }
    }, []);

    const tabs = [
        {
            handler: () => {
                pushRoute({
                    pathname: `/partida/${matchFacts.id}/resumo`,
                    query
                });
            },
            identifier: 'summary',
            name: 'Resumo',
            active: route.includes('resumo')
        },
        {
            handler: () => {
                pushRoute({
                    pathname: `/partida/${matchFacts.id}/escalacoes`,
                    query
                });
            },
            identifier: 'lineup',
            name: 'Escalações',
            active: route.includes('escalacoes')
        }
    ];

    const onClose = () => {
        pushRoute({
            pathname: `/partida/${matchFacts.id}`,
            query
        });
    };

    return (
        <Layout>
            <div>
                <DetailsFixtureListWrapper>

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

                </DetailsFixtureListWrapper>
                <DetailsWrapper>
                    <MatchFacts fixture={matchFacts} tabs={tabs} onClose={onClose} />
                </DetailsWrapper>
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
