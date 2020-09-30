import React from 'react';

import { HeaderWrapper, HeaderTeamTitle, SummaryWrapper } from './styles';

export interface FixtureTeam {
    displayName: string;
    score: number;
    logo?: string;
}

export interface MatchHeaderProps {
    homeTeam: FixtureTeam;
    awayTeam: FixtureTeam;
    matchDate: Date;
    completed: boolean;
};

const formatDate = (date: Date) => {
    const monthMap = {
        0: 'Jan',
        1: 'Fev',
        2: 'Mar',
        3: 'Abr',
        4: 'Mai',
        5: 'Jun',
        6: 'Jul',
        7: 'Ago',
        8: 'Set',
        9: 'Out',
        10: 'Nov',
        11: 'Dec'
    };

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const matchTime = `${hours}:${minutes}`;

    const month = monthMap[date.getMonth()];

    return {
        time: matchTime,
        date: `${month} ${date.getDate()}, ${date.getFullYear()}`
    };
};

export const MatchHeader: React.FC<MatchHeaderProps> = ({ homeTeam, awayTeam, matchDate, completed }: MatchHeaderProps) => {
    const { time, date } = formatDate(matchDate);

    const homeLogo = {
        url: (homeTeam && homeTeam.logo) ? homeTeam.logo : '/teams/default.webp',
        alt: (homeTeam && homeTeam.logo) ? `${homeTeam.displayName} Logo` : 'Default logo'
    };

    const awayLogo = {
        url: (awayTeam && awayTeam.logo) ? awayTeam.logo : '/teams/default.webp',
        alt: (awayTeam && awayTeam.logo) ? `${awayTeam.displayName} Logo` : 'Default logo'
    };

    return (
        <HeaderWrapper>
            <div>
                <img alt={homeLogo.alt} width="50" height="50" src={homeLogo.url} />
                <HeaderTeamTitle>{homeTeam.displayName}</HeaderTeamTitle>
            </div>
            <SummaryWrapper>
                {
                    completed && (
                        <>
                            <span>{homeTeam.score} - {awayTeam.score}</span>
                            <span>Full-Time</span>
                        </>
                    )
                }
                {
                    !completed && (
                        <>
                            <span>{time}</span>
                            <span>{date}</span>
                        </>
                    )
                }
            </SummaryWrapper>
            <div>
                <img alt={awayLogo.alt} width="50" height="50" src={awayLogo.url} />
                <HeaderTeamTitle>{awayTeam.displayName}</HeaderTeamTitle>
            </div>
        </HeaderWrapper>
    );
};
