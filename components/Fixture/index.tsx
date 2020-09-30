import React from 'react';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';

import { Coordinates } from '@components/Map';

import { FixtureWrapper, InfoWrapper, TeamLogo, TournamentWrapper, LaunchIcon } from './styles';

interface FixtureTeam {
    team: {
        name: string;
        id: string;
        displayName: string;
        logo?: string;
    };
    score: number;
}

interface Stadium {
    name: string;
    coordinates: Coordinates
}

interface Redirect {
    url: string;
    keepParams: boolean;
}

interface Tournament {
    id: string;
    name: string;
}

interface FixtureProps {
    id: string;
    homeTeam: FixtureTeam;
    awayTeam: FixtureTeam;
    matchDate: Date;
    ground: Stadium;
    active: boolean;
    tournament: Tournament;
    redirect?: Redirect;
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

export const Fixture: React.FC<FixtureProps> = ({ homeTeam, awayTeam, matchDate, active, redirect, tournament, id }: FixtureProps) => {
    const matchDateObj = new Date(matchDate);
    const estimatedEndTime = new Date(matchDateObj.getTime());
    // const estimatedEndTime = new Date(matchDate.getTime());
    estimatedEndTime.setHours(estimatedEndTime.getHours() + 2);
    estimatedEndTime.setMinutes(estimatedEndTime.getMinutes() + 30);

    const homeLogo = homeTeam.team.logo || '/teams/default.webp';
    const awayLogo = homeTeam.team.logo || '/teams/default.webp';

    const tournamentLogo = `/leagues/${tournament.name.toLocaleLowerCase().replace(/ /g, '')}.svg`;

    const { query, push: pushRoute } = useRouter();
    const href = {
        pathname: redirect.url,
        ...query.year && { query: { year: query.year } }
    };

    const handleDetails = (id: string) => {
        const cleanedQuery = { ...query };
        delete cleanedQuery.id;

        pushRoute({
            pathname: `/partida/${id}/resumo`,
            query: cleanedQuery
        });
    };

    const handleMobileTooltip = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <Link href={href}>
            <a disabled={active}>
                <FixtureWrapper active={active}>
                    <TournamentWrapper data-tip={tournament.name} data-type="dark" onClick={handleMobileTooltip}>
                        <img src={tournamentLogo} alt={tournament.name} />
                    </TournamentWrapper>
                    <ReactTooltip place="top" effect="solid" />

                    <span title={homeTeam.team.displayName || homeTeam.team.name}>
                        {homeTeam.team.displayName || homeTeam.team.name}
                    </span>
                    <TeamLogo src={homeLogo} />
                    <InfoWrapper>
                        {new Date() > estimatedEndTime && (
                            <b>{homeTeam.score} - {awayTeam.score}</b>
                        )}

                        {new Date() <= estimatedEndTime && (
                            <>
                                <span>{formatDate(matchDateObj)}</span>
                                <b>{formatHours(matchDateObj)}</b>
                            </>
                        )}
                    </InfoWrapper>
                    <TeamLogo src={awayLogo} />
                    <span title={awayTeam.team.displayName || awayTeam.team.name}>
                        {awayTeam.team.displayName || awayTeam.team.name}
                    </span>

                    {
                        active && (
                            <button style={{ cursor: 'pointer' }} onClick={() => handleDetails(id)}>
                                <LaunchIcon />
                            </button>
                        )
                    }
                </FixtureWrapper>
            </a>
        </Link>
    );
};
