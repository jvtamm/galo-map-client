import styled from 'styled-components';

export { Map, List } from '@styles/Icons';

export const Container = styled.div`
    /* display: grid;

    grid-template-columns: 1fr 11fr;
    grid-template-areas: 'menu main'; */

    display: flex;

    width: 100vw;
    height: 100vh;

    @media(max-width: 375px) {
        flex-direction: column;
    }
`;

export const Menu = styled.div`
    max-width: 80px;

    @media(max-width: 375px) {
        max-width: 100vw;
        height: 70px;
    }
`;

export const Main = styled.main`
    flex-grow: 1;
    /* max-height: 100%; */

    & > div {
        max-height: 100%;

        display: flex;
        height: 100%;
    }

    @media(max-width: 375px) {
        height: calc(100% - 70px)
    }
`;
