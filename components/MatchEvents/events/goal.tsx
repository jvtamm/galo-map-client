import React from 'react';

import { Assist, PlayerWrapper } from './styles';
import { EventProps } from './index';

const Icon = () => {
    return (
        <svg viewBox="0 0 20 20">
            <title>Goal</title>
            <path d="M16.368 3.633C12.856.122 7.144.122 3.633 3.633c-3.512 3.509-3.512 9.224 0 12.734 3.511 3.51 9.223 3.511 12.735 0 3.51-3.51 3.51-9.225 0-12.734zm-1.232 11.504c-2.285 2.281-5.725 2.722-8.454 1.322l.648-1.526-2.264-2.263-1.527.648c-1.399-2.731-.96-6.169 1.325-8.454 2.284-2.282 5.719-2.724 8.451-1.325l-.641 1.508 2.264 2.263 1.516-.641c1.408 2.733.969 6.179-1.318 8.468zm-4.268-4.269l-.752 3.483 2.935 1.134 2.437-2.436-1.171-2.966zM4.753 7.015l1.212 2.883 3.328-.605.616-3.317-2.895-1.222z" />
        </svg>
    );
};

export const GoalEvent: React.FC<EventProps> = ({ data }) => {
    return (
        <>
            <Icon />
            <PlayerWrapper>
                <span>
                    {data.scorer.name}
                </span>
                {
                    data.assistedBy && <Assist>assistência de {data.assistedBy.name}</Assist>
                }
            </PlayerWrapper>
        </>
    );
};
