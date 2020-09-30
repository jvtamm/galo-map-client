import { Launch } from '@styled-icons/material-outlined';
import styled from 'styled-components';

interface FixtureWrapperProps {
    active: boolean;
}

export const FixtureWrapper = styled.div<FixtureWrapperProps>`
    background: ${({ active }) => active ? 'rgb(242, 244, 247)' : 'var(--white)'};
    color: var(--primary-text);
    position: relative;
    display: grid;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-items: center;
    /* grid-template-columns: 1fr 25px 40px 25px 1fr; */
    grid-template-columns: 20px 1fr 25px 40px 25px 1fr 20px;
    grid-column-gap: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 70px;
    border-bottom: 1px solid var(--light-effect);
    cursor: ${({ active }) => active ? 'default' : 'pointer'};
    padding: 0 22px;

    &:hover {
        background: rgb(242, 244, 247);
    }

    & > span {
        font-size: 14px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    & > span:nth-child(3) {
        text-align: right;
    }

    /* & > span:nth-child(2) {
        text-align: left;
        grid-column: 5/5;
    } */

    & > img {
        grid-row: 1/1;
    } 

    & > img:last-of-type {
        /* grid-column: 4/5; */
    }

    & > * {
        grid-row: 1/1;
    }
`;

export const InfoWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: max-content;
    grid-row-gap: 5px;
    justify-items: center;

    & > span {
        font-size: 12px;
        line-height: 14px;
    }

    & > span + b {
        font-size: 12px;
        line-height: 14px;
    }
`;

export const TeamLogo = styled.img`
    width: 25px;
    height: 25px;
`;

export const TournamentWrapper = styled.p`
    z-index: 2;
    
    & > img {
        height: 20px;
        width: 20px;
    }
`;

export const LaunchIcon = styled(Launch)`
    flex-shrink: 0;
    z-index: 2;
    
    width: 14px;
    height: 14px;
    color: var(--primary-text);
`;
