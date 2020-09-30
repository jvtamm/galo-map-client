import styled from 'styled-components';

export const Assist = styled.p`
    color: rgb(152, 152, 152);
`;

export const PlayerWrapper = styled.div`
    display: flex;
    flex-flow: column;

    /* & > * {
        text-align: right;
    } */

    & > span {
        font-size: 14px;
        letter-spacing: 0.14px;
        line-height: 1.08;
    }

    & > p {
        font-size: 14px;
        letter-spacing: 0.49px;
    }

    & > p:not(:first-child) {
        margin-top: 4px;
    }
`;

interface SwapPlayerProps {
    isIn: boolean;
}

export const SwapPlayer = styled.p<SwapPlayerProps>`
    color: ${({ isIn }) => isIn ? 'var(--success) !important' : 'var(--warning) !important'}
`;
