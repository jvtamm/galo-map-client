import React from 'react';

import { Container, Fixture, Name, Result } from './styles';

export interface FixtureProps {
    id: string,
    ground: string,
    homeTeam: {
        name: string,
        score: number
    },
    awayTeam: {
        name: string,
        score: number
    }
}

interface StadiumPopupProps {
    fixtures?: FixtureProps[];
    onItemClick?: (id: string) => void;
}

export const StadiumPopup: React.FC<StadiumPopupProps> = ({ fixtures, onItemClick }: StadiumPopupProps) => {
    const ground = fixtures && fixtures.length ? fixtures[0].ground : '';

    return (
        <Container>
            <Name title={ground}>{ground}</Name>
            {
                fixtures.map((item) => {
                    const title = `${item.homeTeam.name} ${item.homeTeam.score} x ${item.awayTeam.score} ${item.awayTeam.name}`;

                    return (
                        <Fixture key={item.id} title={title} onClick={() => onItemClick(item.id)}>
                            <h3>{item.homeTeam.name}</h3>
                            <Result>
                                <h4>{item.homeTeam.score}</h4>
                                <span>vs</span>
                                <h4>{item.awayTeam.score}</h4>
                            </Result>
                            <h3>{item.awayTeam.name}</h3>
                        </Fixture>
                    );
                })
            }
        </Container>
    );
};
