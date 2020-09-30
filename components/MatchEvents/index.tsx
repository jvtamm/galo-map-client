import React from 'react';
import { Event } from '@services/fixture-details';

import { EventFactory } from './events';
import { EventItem, EventsWrapper, TimeWrapper } from './styles';

interface MatchEventsProps {
    events?: Event[];
}

export const MatchEvents: React.FC<MatchEventsProps> = ({ events }) => {
// export const MatchEvents: React.FC<MatchEventsProps> = () => {
    return (
        <EventsWrapper>
            {
                events && events.map(({ type, details, timestamp, isAway }, index) => {
                    const props = {
                        type,
                        details
                    };

                    return (
                        <EventItem key={index} isAway={isAway}>
                            <TimeWrapper>
                                <span>{timestamp}&apos;</span>
                            </TimeWrapper>
                            <EventFactory {...props} />
                        </EventItem>
                    );
                })
            }
        </EventsWrapper>
    );
};
