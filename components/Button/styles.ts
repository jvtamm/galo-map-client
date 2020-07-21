import styled from 'styled-components';

interface BaseButtonProps {
    color: string;
    textColor: string;
}

export const ButtonBaseStyle = styled.button<BaseButtonProps>`
    background-color: ${({ color }) => color && !color.includes('#') ? `var(--${color})` : color};
    color: ${({ textColor }) => textColor && !textColor.includes('#') ? `var(--${textColor})` : textColor};
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    overflow: hidden;
    text-decoration: none;
    transition: background-color .2s ease-in-out;
    user-select: none;
    z-index: 1;
    padding: 8px;
    border-radius: 4px;
    min-width: 100px;
    font: inherit;

    &:disabled {
        background-color: rgba(23, 36, 38, 0.3);
        color: var(--primary-text);
        opacity: .5;
    }
`;
