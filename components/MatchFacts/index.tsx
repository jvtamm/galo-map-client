import React from 'react';
import { useRouter } from 'next/router';

import { MatchEvents } from '@components/MatchEvents';
import { MatchHeader } from '@components/MatchHeader';
import { MatchInfoBox } from '@components/MatchInfoBox';
import { NavTab } from '@components/NavTab';

import { Fixture } from '@services/fixture';
import { Event } from '@services/fixture-details';

import { MatchFactsWrapper, InfoWrapper, TabbedInfo, Divider } from './styles';

export const MatchFacts: React.FC<Fixture> = ({ id, awayTeam, homeTeam, tournament, ground, referee, status, details, matchDate }) => {
    const matchDateObj = new Date(matchDate);

    const info = {
        matchDate: matchDateObj,
        ground: ground.name,
        tournament,
        referee
    };

    const { query, route } = useRouter();
    delete query.id;

    const tabs = [
        {
            href: {
                pathname: `partida/${id}/resumo`,
                query
            },
            name: 'Resumo',
            active: route.includes('resumo')
        },
        {
            href: {
                pathname: `partida/${id}/escalacoes`,
                query
            },
            name: 'Escalações',
            active: route.includes('escalacoes')
        }
    ];

    return (
        <MatchFactsWrapper>
            <MatchHeader
                homeTeam={{ ...homeTeam.team, score: homeTeam.score }}
                awayTeam={{ ...awayTeam.team, score: awayTeam.score }}
                matchDate={matchDateObj}
                completed={status === 'FT'}/>
            <NavTab tabs={tabs}/>
            <TabbedInfo>
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
            </TabbedInfo>
        </MatchFactsWrapper>
    );
};
