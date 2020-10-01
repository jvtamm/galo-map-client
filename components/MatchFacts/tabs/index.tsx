import React from 'react';

import { Fixture } from '@services/fixture';

import { MatchSummary } from './summary';
import { MatchLineup } from './lineup';

interface TabsFactoryProps {
    type: string,
    fixture: Fixture;
}

export const MatchTabsFactory = ({ type, fixture }: TabsFactoryProps) => {
    switch (type) {
        case 'summary':
            return <MatchSummary {...fixture}/>;
        case 'lineup':
            return <MatchLineup {...fixture}/>;
        default:
            return null;
    }
};
