import React from 'react';
import MenuBar, { MenuItem } from '@components/MenuBar';

import { Container, Menu, Main, Map, List } from './styles';

interface LayoutProps {
    children: React.ReactNode
}

const menuItems: MenuItem[] = [
    {
        name: 'Jogos',
        href: '/',
        Icon: List
    },
    {
        name: 'Mapa',
        href: '/mapa',
        Icon: Map
    }
];

export const Layout: React.FC = ({ children }: LayoutProps) => {
    return (
        <Container>
            <Menu>
                <MenuBar items={menuItems}/>
            </Menu>
            <Main>
                {children}
            </Main>
        </Container>
    );
};
