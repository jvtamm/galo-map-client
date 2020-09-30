import styled from 'styled-components';

import { Clear } from 'styles/Icons';

type ContainerProps = {
    color: string;
}

export const Container = styled.div<ContainerProps>`
    display: inline-flex;
    padding: 5px 8px 5px 12px;
    color: ${props => `var(--${props.color})` || 'var(--primary-text)'};

    border: 1px solid;
    border-color: ${props => `var(--${props.color})` || 'var(--primary-text)'};
    border-radius: 25px;

    align-items: center;

    & > label {
        font-size: 14px;
        line-height: 16px;
        margin-right: 8px;
    }
`;

export const CloseButton = styled.button`
    cursor: pointer
`;

export const CloseIcon = styled(Clear)`
    flex-shrink: 0;
    
    width: 14px;
    height: 14px;
    color: var(--primary-text);
`;
