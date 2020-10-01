import React from 'react';

import { MatchEvents } from '@components/MatchEvents';
import { MatchInfoBox } from '@components/MatchInfoBox';
import { Fixture } from '@services/fixture';
import { Event } from '@services/fixture-details';

import { Divider, InfoWrapper } from './styles';

export const MatchSummary: React.FC<Fixture> = ({ details, matchDate, tournament, ground, referee }) => {
    const matchDateObj = new Date(matchDate);

    const info = {
        matchDate: matchDateObj,
        ground: ground.name,
        tournament,
        referee
    };

    return (
        <>
            {
                Boolean(details && details.events && details.events.length) && (
                    <>
                        <MatchEvents events={details.events as Event[]}/>
                        <Divider />
                    </>
                )
            }
            <InfoWrapper>
                <MatchInfoBox {...info} />
            </InfoWrapper>
        </>
    );
};
