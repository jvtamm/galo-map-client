import styled from 'styled-components';

export const Container = styled.div`
    width: 250px;

    & > div:not(:last-child) {
        border-bottom: 1px solid var(--light-effect);
    }
`;

export const Name = styled.h2`
    position: absolute;
    height: 30px;
    top: 10px;
    left: 19px;
    display: inline-block;

    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Fixture = styled.div`
    cursor: pointer;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 45px 1fr;
    grid-column-gap: 10px;
    min-width: 200px;
    height: 30px;

    & > * {
        grid-row: 1/1;
    }

    & > h3 {
        font-size: 14px;
        font-weight: normal;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    & > h3:first-child {
        text-align: right;
    }
`;

export const Result = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;

    & > h4 {
        font-weight: 800;
    }
`;
