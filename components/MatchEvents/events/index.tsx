import React from 'react';
import { CardEvent } from './card';

import { GoalEvent } from './goal';
import { SubEvent } from './substitution';

export type EventTypes = 'card' | 'goal' | 'substitution';

interface EventFactoryProps {
    type: EventTypes,
    details?: any;
}

export interface EventProps {
    data: any;
}

// Add penalty and period events
export const EventFactory = ({ type, details }: EventFactoryProps) => {
    switch (type) {
        case 'goal':
            return <GoalEvent data={details} />;
        case 'substitution':
            return <SubEvent data={details} />;
        case 'card':
            return <CardEvent data={details} />;
        default:
            // return <GoalEvent data={details} />;
            return null;
    }
};
