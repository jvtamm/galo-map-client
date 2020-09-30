import React from 'react';

import { PlayerWrapper } from './styles';
import { EventProps } from './index';

const Icon = ({ color }) => {
    const fillColor = color === 'YELLOW' ? 'var(--secondary)' : 'var(--warning)';
    const title = color === 'YELLOW' ? 'Yelloy card' : 'Red card';

    return (
        <svg viewBox="0 0 20 20">
            <title>{title}</title>
            <rect
                width={10}
                height={14}
                rx={1}
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1.28571 0 0 1.28571 3.571 1)"
                fill={fillColor}
            />
        </svg>
    );
};

export const CardEvent: React.FC<EventProps> = ({ data }) => {
    return (
        <>
            <Icon color={data.color}/>
            <PlayerWrapper>
                <p>{data.player.name}</p>
            </PlayerWrapper>
        </>
    );
};
