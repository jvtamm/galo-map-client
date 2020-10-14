import React from 'react';
import { Event } from '@services/fixture-details';

import { EventFactory } from './events';
import { EventItem, EventsWrapper, TimeWrapper } from './styles';

interface MatchEventsProps {
    events?: Event[];
}

export const MatchEvents: React.FC<MatchEventsProps> = ({ events }) => {
    return (
        <EventsWrapper>
            {
                events && events.map(({ type, data, timestamp, isAway }, index) => {
                    const props = {
                        type,
                        details: data
                    };

                    return (
                        <EventItem key={index} isAway={isAway}>
                            <TimeWrapper>
                                {
                                    timestamp && (
                                        <span>{timestamp}&apos;</span>
                                    )
                                }
                            </TimeWrapper>
                            <EventFactory {...props} />
                        </EventItem>
                    );
                })
            }
        </EventsWrapper>
    );
};
