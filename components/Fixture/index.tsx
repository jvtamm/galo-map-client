import React from 'react';
import { Container, InfoWrapper } from './styles';

interface FixtureTeam {
    team: {
        name: string;
        id: string;
    };
    score: number;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Stadium {
    name: string;
    coordinates: Coordinates
}

interface FixtureProps {
    homeTeam: FixtureTeam;
    awayTeam: FixtureTeam;
    matchDate: Date;
    ground: Stadium
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return `${day}/${month}/${year}`;
};

const formatHours = (date: Date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${hour}:${minutes}`;
};

export const Fixture: React.FC<FixtureProps> = ({ homeTeam, awayTeam, matchDate }: FixtureProps) => {
    const estimatedEndTime = new Date(matchDate.getTime());
    estimatedEndTime.setHours(estimatedEndTime.getHours() + 2);
    estimatedEndTime.setMinutes(estimatedEndTime.getMinutes() + 30);

    return (
        <Container>
            <span>{homeTeam.team.name}</span>
            <InfoWrapper>
                { new Date() > estimatedEndTime && (
                    <b>{homeTeam.score} - {awayTeam.score}</b>
                )}

                { new Date() <= estimatedEndTime && (
                    <>
                        <span>{formatDate(matchDate)}</span>
                        <b>{formatHours(matchDate)}</b>
                    </>
                )}
            </InfoWrapper>
            <span>{awayTeam.team.name}</span>
        </Container>
    );
};
