import styled from 'styled-components';

export const GroupWrapper = styled.div`
    display: grid;
    -webkit-box-pack: center;
    justify-content: center;
    place-items: flex-start center;
    grid-template-columns: 1fr 1fr;

    & > h5 {
        grid-area: 1 / span 2 / auto / auto;
        padding: 20px 0px;
        background-color: white;
    }

    & > div:first-of-type {
        border-right: 1px solid rgb(240, 242, 244);
    }

    & > div {
        width: 100%;
    }
`;

export const SectionTitle = styled.h5`
    letter-spacing: 0.36px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
`;

export const SectionSide = styled.div`
    display: grid;
    grid-auto-rows: 70px;
    row-gap: 20px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
`;

export const PlayerContainer = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;

    & > b {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        -webkit-text-stroke: 1px var(--light-grey);
        -webkit-text-fill-color: white;
    }

    & > p {
        font-size: 0.875rem;
        color: var(--primary-text);
    }
`;
