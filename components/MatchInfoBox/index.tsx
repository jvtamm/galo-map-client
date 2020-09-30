import React from 'react';

import { InfoBoxWrapper } from './styles';

interface Tournament {
    id: string;
    name: string;
}

interface MatchInfoBoxProps {
    matchDate: Date;
    tournament: Tournament;
    ground: string;
    referee?: string;
    attendance?: number;
}

function formatDate(date: Date) {
    const monthMap = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro'
    };

    const dayMap = {
        0: 'Domingo',
        1: 'Segunda-feira',
        2: 'Terça-feira',
        3: 'Quarta-feira',
        4: 'Quinta-feira',
        5: 'Sexta-feira',
        6: 'Sábado'
    };

    const day = date.getDay();
    const month = date.getMonth();

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${dayMap[day]}, ${date.getDate()} ${monthMap[month]} ${date.getFullYear()}, ${hours}:${minutes}`;
}

export const MatchInfoBox: React.FC<MatchInfoBoxProps> = ({ matchDate, tournament, ground, referee, attendance }) => {
    return (
        <InfoBoxWrapper>
            <span className="header">Data</span>
            <span className="value">{formatDate(matchDate)}</span>
            <span className="header">Torneio</span>
            <span className="value">{tournament.name}</span>
            {
                ground && (
                    <>
                        <span className="header">Estádio</span>
                        <span className="value">{ground}</span>
                    </>
                )
            }
            {
                referee && (
                    <>
                        <span className="header">Árbitro</span>
                        <span className="value">{referee}</span>
                    </>
                )
            }
            {
                attendance && (
                    <>
                        <span className="header">Público</span>
                        <span className="value">{attendance.toLocaleString('br')}</span>
                    </>
                )
            }
        </InfoBoxWrapper>
    );
};
