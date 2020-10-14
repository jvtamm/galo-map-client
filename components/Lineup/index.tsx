import React from 'react';

import { GroupWrapper, SectionTitle, SectionSide, PlayerContainer } from './styles';

interface Player {
    name: string;
    jersey: number;
    id?: string;
}

export interface SummonedPlayers {
    bench: Player[];
    lineup: Player[];
}

export interface LineupProps {
    homePlayers: SummonedPlayers;
    awayPlayers: SummonedPlayers;
}

export const Lineup: React.FC<LineupProps> = ({ homePlayers, awayPlayers }: LineupProps) => {
    return (
        <>
            <GroupWrapper>
                <SectionTitle>Titulares</SectionTitle>
                <SectionSide>
                    {
                        homePlayers.lineup.map(({ name, jersey, id }) => (
                            <PlayerContainer key={id}>
                                <b>{jersey}</b>
                                <p>{name}</p>
                            </PlayerContainer>
                        ))
                    }
                </SectionSide>
                <SectionSide>
                    {
                        awayPlayers.lineup.map(({ name, jersey, id }) => (
                            <PlayerContainer key={id}>
                                <b>{jersey}</b>
                                <p>{name}</p>
                            </PlayerContainer>
                        ))
                    }
                </SectionSide>
            </GroupWrapper>

            <GroupWrapper>
                <SectionTitle>Reservas</SectionTitle>
                <SectionSide>
                    {
                        homePlayers.bench.map(({ name, jersey, id }) => (
                            <PlayerContainer key={id}>
                                <b>{jersey}</b>
                                <p>{name}</p>
                            </PlayerContainer>
                        ))
                    }
                </SectionSide>
                <SectionSide>
                    {
                        awayPlayers.bench.map(({ name, jersey, id }) => (
                            <PlayerContainer key={id}>
                                <b>{jersey}</b>
                                <p>{name}</p>
                            </PlayerContainer>
                        ))
                    }
                </SectionSide>
            </GroupWrapper>
        </>
    );
};
