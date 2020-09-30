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

// export const Lineup: React.FC<LineupProps> = ({ homePlayers, awayPlayers }: LineupProps) => {
export const Lineup: React.FC<any> = () => {
    return (
        <div style={{ display: 'flex', flex: 1 }} >
            <div style={{ flex: 1, flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <b>1</b>
                    <p>Victor</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <b>2</b>
                    <p>Marcos Rocha</p>
                </div>
            </div>
            <div style={{ flex: 1, flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                    <b>1</b>
                    <p>Fábio</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <b>2</b>
                    <p>Ceará</p>
                </div>
            </div>
        </div>
    );
};
