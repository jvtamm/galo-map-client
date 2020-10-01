import React from 'react';

import { MatchHeader } from '@components/MatchHeader';
import { NavTab, TabsProps } from '@components/NavTab';

import { Fixture } from '@services/fixture';

import { MatchTabsFactory } from './tabs';
import { MatchFactsWrapper, TabbedInfo, CloseButton, CloseIcon } from './styles';

interface MatchFactsProps {
    tabs: TabsProps[];
    fixture: Fixture;
    onClose?: () => void;
}

export const MatchFacts: React.FC<MatchFactsProps> = ({ fixture, tabs, onClose }) => {
    const { awayTeam, homeTeam, status, matchDate } = fixture;
    const matchDateObj = new Date(matchDate);

    const activeTab = tabs.find(tab => tab.active);

    return (
        <MatchFactsWrapper>
            {
                onClose && (
                    <CloseButton onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                )
            }
            <MatchHeader
                homeTeam={{ ...homeTeam.team, score: homeTeam.score }}
                awayTeam={{ ...awayTeam.team, score: awayTeam.score }}
                matchDate={matchDateObj}
                completed={status === 'FT'}/>
            <NavTab tabs={tabs}/>
            <TabbedInfo>
                <MatchTabsFactory type={activeTab && activeTab.identifier} fixture={fixture} />
                {/* {
                    Boolean(details && details.events && details.events.length) && (
                        <>
                            <MatchEvents events={details.events as Event[]}/>
                            <Divider />
                        </>
                    )
                }
                <InfoWrapper>
                    <MatchInfoBox {...info} />
                </InfoWrapper> */}
            </TabbedInfo>
        </MatchFactsWrapper>
    );
};
