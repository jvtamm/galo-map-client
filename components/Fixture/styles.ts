import styled from 'styled-components';

export const Container = styled.a`
    background: var(--white);
    color: var(--primary-text);
    position: relative;
    display: grid;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 25px 40px 25px 1fr;
    /* grid-template-columns: 1fr 70px 1fr; */
    grid-column-gap: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 70px;
    border-bottom: 1px solid var(--light-effect);
    cursor: pointer;

    & > span {
        font-size: 14px;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    & > span:first-child {
        text-align: right;
    }

    & > span:nth-child(2) {
        text-align: left;
        grid-column: 5/5;
    }

    & > img {
        grid-row: 1/1;
    } 

    & > img:last-of-type {
        grid-column: 4/5;
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
