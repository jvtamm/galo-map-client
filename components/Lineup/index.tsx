import React from 'react';

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
        <div style={{ display: 'flex', flex: 1 }} >
            <div style={{ flex: 1, flexDirection: 'column' }}>
                {
                    homePlayers.lineup.map(({ name, jersey, id }) => (
                        <div style={{ display: 'flex' }} key={id}>
                            <b>{jersey}</b>
                            <p>{name}</p>
                        </div>
                    ))
                }
            </div>
            <div style={{ flex: 1, flexDirection: 'column' }}>
                {
                    awayPlayers.lineup.map(({ name, jersey, id }) => (
                        <div style={{ display: 'flex' }} key={id}>
                            <b>{jersey}</b>
                            <p>{name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
