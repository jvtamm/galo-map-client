import React from 'react';
import MenuBar, { MenuItem } from '@components/MenuBar';

import { Container, Menu, Main, Map, BarChart } from './styles';

interface LayoutProps {
    children: React.ReactNode
}

const menuItems: MenuItem[] = [
    {
        name: 'Mapa',
        href: '/',
        Icon: Map
    },
    {
        name: 'Estatísticas',
        href: '/estatisticas',
        Icon: BarChart
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
