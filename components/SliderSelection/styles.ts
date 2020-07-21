import styled, { css } from 'styled-components';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@styles/Icons';

interface ContainerProps {
    color?: string;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Add media query */
    padding: 16px;
    background: transparent;

    & > label {
        color: ${({ color }) => color ? `var(--${color})` : 'var(--secondary)'};
        font-size: 14px;
        font-weight: bold;
        line-height: 16px;
    }
`;

export const ButtonContainer = styled.button`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    &:disabled > svg {
        fill: rgba(23, 36, 38, 0.5);
        color: rgba(23, 36, 38, 0.5);

        cursor: default;
    }


    border-radius: 50%;

    &:hover:enabled {
        background: var(--light-effect)
    }
    
`;

const iconCSS = css`
    flex-shrink: 0;
    color: var(--primary-text);

/* Add media query */
    width: 24px;
    height: 24px;
`;

export const ArrowLeft = styled(KeyboardArrowLeft)`${iconCSS}`;
export const ArrowRight = styled(KeyboardArrowRight)`${iconCSS}`;
