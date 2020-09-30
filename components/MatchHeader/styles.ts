import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* padding-top: 30px; */

    & > * {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const HeaderTeamTitle = styled.span`
    letter-spacing: 0.2px;
    padding-top: 15px;
    max-width: 100px;
    text-align: center;
`;

export const SummaryWrapper = styled.div`
    justify-content: space-evenly;

    & > span:first-child {
        white-space: nowrap;
        font-size: 32px;
        font-weight: 500;
        letter-spacing: 0.5px;
    }

    & > span:last-child {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.2px;
        color: rgb(131, 131, 131);
    }
`;
