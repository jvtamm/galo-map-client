import styled, { css } from 'styled-components';

const fixtureListCss = css`
    width: 45%;
    background: var(--white);
    border-right: 1px solid var(--light-effect);
    height: 100%;
`;

export const MapFixtureListWrapper = styled.div`
    ${fixtureListCss}

    @media(max-width: 768px) {
        width: 100%;
    }
`;

export const DetailsFixtureListWrapper = styled.div`
    ${fixtureListCss}

    @media(max-width: 768px) {
        display: none
    }
`;

const detailsCss = css`
    width: 55%;
    height: 100%;
`;

export const DetailsWrapper = styled.div`
    ${detailsCss}

    @media(max-width: 768px) {
        width: 100%;
    }
`;

export const MapWrapper = styled.div`
    ${detailsCss}

    @media(max-width: 768px) {
        display: none;
    }
`;
