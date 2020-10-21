import React from 'react';

import { Fixture } from '@components/Fixture';
import { useFilters } from '@contexts/filter';
import { useWindowSize } from '@hooks/useWindowSize';

interface FixtureListProps {
    fixtures: Array<any>;
    initialSelected: any;
    children?: React.ReactNode;
}

export const FixtureList: React.FC<FixtureListProps> = ({ fixtures, initialSelected }: FixtureListProps) => {
    const { filters, includes } = useFilters();
    const { width } = useWindowSize();

    const filteredFixtures = filters.length === 0 ? fixtures : fixtures.filter(({ tournament }) => includes(tournament.id));

    const TABLET_WIDTH = 768;

    return (
        <>
            {
                filteredFixtures.map((fixture) => {
                    const anchor = width > TABLET_WIDTH ? `/partida/${fixture.id}` : `/partida/${fixture.id}/resumo`;
                    const redirect = {
                        url: anchor,
                        keepParams: true
                    };

                    const fixtureProp = { ...fixture, redirect };

                    return <Fixture {...fixtureProp} active={fixture.id === initialSelected.id} key={fixture.id} />;
                })
            }
        </>
    );
};
