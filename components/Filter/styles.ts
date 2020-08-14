import styled, { css } from 'styled-components';

import { FilterList } from '@styles/Icons';

export const Container = styled.div`
    display: flex;
    /* width: 100%; */

    background: transparent;
    position: relative;
`;

export const FilterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;

    padding: 4px;

    &:hover:enabled {
        background: var(--light-effect)
    }
`;

export const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    background: var(--white);   
    z-index: 3;
    top: 28px;
    border: 1px solid rgba(23, 36, 38, 0.2);
    border-radius: 2px;
    min-width: 264px;
    padding: 16px;

    box-shadow: 0px 8px 16px 0px rgba(0,0,0,.2);
`;

export const FilterSection = styled.div`
    display: flex;
    flex-direction: column;

    & > span {
        color: rgba(23, 36, 38, 0.4);
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 16px;
    }

    & > ul {
        list-style-type: none;
    }

    & > ul > li {
        margin-bottom: 8px;
    }

    & > ul > li:last-child {
        margin-bottom: 16px;
    }
`;

export const CheckBox = styled.input`
    pointer-events: none;
    position: absolute;
    opacity: 0;

    & + label {
        position: relative;
        cursor: pointer;
        padding: 0;

        display: flex;
        align-items: center;

        color: var(--primary-text)
    }

    & + label:before {
        border-radius: 4px;
        border: 1px solid rgba(23, 36, 38, 0.2);

        content: " ";
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }

    &:checked + label:after {
        content: '';
        position: absolute;
        left: 6px;
        top: 10px;
        background: white;
        width: 2px;
        height: 2px;
        box-shadow: 
            2px 0 0 white,
            4px 0 0 white,
            4px -2px 0 white,
            4px -4px 0 white,
            4px -6px 0 white,
            4px -8px 0 white;
        transform: rotate(45deg);
    }

    &:hover + label:before {
        border-color: var(--primary-text);
    }

    &:checked + label:before {
        background: var(--success);
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 8px;
    height: 32px;
    font-weight: bold;
    font-size: 14px;

    min-width: 64px;
`;

const iconCSS = css`
    flex-shrink: 0;

    width: 24px;
    height: 24px;    
`;

export const FilterIcon = styled(FilterList)`${iconCSS}`;
