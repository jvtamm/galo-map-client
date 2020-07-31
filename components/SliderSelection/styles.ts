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

interface AnchorWrapperProps {
    disabled: boolean;
}

export const AnchorWrapper = styled.div<AnchorWrapperProps>`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    & > svg {
        fill: ${({ disabled }) => disabled ? 'rgba(23, 36, 38, 0.5)' : 'var(--primary-text)'};
        color: ${({ disabled }) => disabled ? 'rgba(23, 36, 38, 0.5)' : 'var(--primary-text)'};

        cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
    }

    border-radius: 50%;

    &:hover {
        background: ${({ disabled }) => disabled ? 'transparent' : 'var(--light-effect)'};
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
