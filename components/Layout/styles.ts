import styled from 'styled-components';

export { Map, BarChart } from '@styles/Icons';

export const Container = styled.div`
    /* display: grid;

    grid-template-columns: 1fr 11fr;
    grid-template-areas: 'menu main'; */

    display: flex;

    width: 100vw;
    height: 100vh;
`;

export const Menu = styled.div`
    flex: 1;

    max-width: 100px;
`;

export const Main = styled.main`
    flex: 11;
`;
