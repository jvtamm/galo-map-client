import styled from 'styled-components';

export const TimelineWrapper = styled.div`
    background: white;
    position: absolute;

    height: 70px;
    width: 600px;
    max-width: 100%;
    bottom: 50px;
    left:0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    z-index: 1000;
    box-shadow: 0px 5px 20px rgba(0,0,0,.3);

    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: scroll;

    @media(max-width: 375px) {
        bottom: 0;
    }
`;

export const DistanceWrapper = styled.div`
    color: var(--primary-text);
    font-weight: bold;
    font-size: 0.75rem;
    background: white;
    position: absolute;

    height: 65px;
    width: 65px;
    border-radius: 5px;
    top: 80px;
    right: 10px;
    margin-left: auto;
    margin-right: auto;

    z-index: 1000;
    box-shadow: 0px 5px 20px rgba(0,0,0,.3);

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;

    > div {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        align-items: center;
        justify-content: center;
    }

    span {
        color: var(--secondary);
        margin-left: 4px;
    }
`;
