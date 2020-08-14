import styled from 'styled-components';

// import { Map, BarChart } from '@styles/Icons';

export const Container = styled.nav`
    background: var(--primary);

    max-height: 100%;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;

    position: sticky;
    top: 0;
    left: 0;

    padding: 32px 24px;
    height: 100vh;

    @media(max-width: 375px) {
        flex-direction: row;
        justify-content: space-around;
        padding: 0;
    }
`;

type MenuItemProps = {
    active: boolean;
};

export const MenuItem = styled.li<MenuItemProps>`
    display: flex;
    align-items: center;
    flex-shrink: 0;

    padding: 8.25px 0;
    outline: 0;

    cursor: pointer;

    & + li {
        margin-top: 16px;

        @media(max-width: 375px) {
            margin-top: 0;
        }
    }

    svg {
        color: ${(props) => props.active ? 'var(--secondary)' : 'var(--white)'};
        fill: ${(props) => props.active ? 'var(--secondary)' : 'var(--white)'};

        flex-shrink: 0;

        width: 32px;
        height: 32px;
        color: var(--white);
    }
`;

// const iconCSS = css`

// `;

// export const MapIcon = styled(Map)`${iconCSS}`;
// export const ChartIcon = styled(BarChart)`${iconCSS}`;
