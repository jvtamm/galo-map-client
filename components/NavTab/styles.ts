import styled from 'styled-components';

export const NavTabWrapper = styled.nav`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 120px;
    justify-items: center;
    overflow-x: auto;
    padding-top: 30px;
    border-bottom: 2px solid whitesmoke;

    & > * {
        width: 100%;
    }
`;

interface NavItemProps {
    active: boolean;
}

export const NavItem = styled.button<NavItemProps>`
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.2px;
    padding-bottom: 17px;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ active }) => active ? 'var(--success)' : 'var(--light-grey)'};
    border-bottom: ${({ active }) => active ? '3px solid var(--success)' : '3px solid transparent'};
    cursor: ${({ active }) => active ? 'default' : 'pointer'};

    ${({ active }) => !active && `
        &:hover {
            opacity: 0.4;
        }
    `}
`;
