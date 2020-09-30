import React from 'react';

import { SwapPlayer, PlayerWrapper } from './styles';
import { EventProps } from './index';

const Icon = () => {
    return (
        <svg viewBox="0 0 20 20">
            <title>Substitution</title>
            <path
                d="M15.723 2.646a.472.472 0 00-.146.346v6.88c0 .133.048.248.146.345a.473.473 0 00.345.146.472.472 0 00.346-.146l3.44-3.44c.097-.097.146-.212.146-.345s-.049-.249-.146-.346l-3.44-3.44a.473.473 0 00-.346-.146.473.473 0 00-.345.146z"
                fill="#389a5d"
                style={{
                    fill: '#389a5d'
                }}
            />
            <path
                d="M8.324 5.094h7.486v2.714H8.324a1.4 1.357 0 01-1.4-1.357 1.4 1.357 0 011.4-1.357z"
                fill="#389a5d"
            />
            <g>
                <path
                    d="M4.277 17.354a.472.472 0 00.146-.346v-6.88a.472.472 0 00-.146-.345.473.473 0 00-.345-.146.472.472 0 00-.346.146l-3.44 3.44c-.097.097-.146.212-.146.345s.049.249.146.346l3.44 3.44a.473.473 0 00.346.146.473.473 0 00.345-.146z"
                    fill="#d71920"
                    style={{
                        fill: '#d71920'
                    }}
                />
                <path
                    d="M11.676 14.906H4.19v-2.714h7.486a1.357 1.4 90 011.4 1.357 1.357 1.4 90 01-1.4 1.357z"
                    fill="#d71920"
                />
            </g>
        </svg>
    );
};

export const SubEvent: React.FC<EventProps> = ({ data }) => {
    return (
        <>
            <Icon />
            <PlayerWrapper>
                <SwapPlayer isIn={true}>{data.inPlayer.name}</SwapPlayer>
                <SwapPlayer isIn={false}>{data.outPlayer.name}</SwapPlayer>
            </PlayerWrapper>
        </>
    );
};
