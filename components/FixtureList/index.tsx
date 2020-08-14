import React from 'react';

import { Fixture } from '@components/Fixture';
import { useFilters } from '@contexts/filter';

interface FixtureListProps {
    fixtures: Array<any>;
    initialSelected: any;
    children?: React.ReactNode;
}

export const FixtureList: React.FC<FixtureListProps> = ({ fixtures, initialSelected }: FixtureListProps) => {
    const { filters, includes } = useFilters();

    const filteredFixtures = filters.length === 0 ? fixtures : fixtures.filter(({ tournament }) => includes(tournament.id));

    return (
        <>
            {
                filteredFixtures.map((fixture) => {
                    const anchor = `/partida/${fixture.id}`;
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
