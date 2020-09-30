import React from 'react';
import Link from 'next/Link';
import { UrlObject } from 'url';

import { NavTabWrapper, NavItem } from './styles';

interface TabsProps {
    href: UrlObject;
    name: string;
    active: boolean
}

interface NavTabProps {
    tabs: TabsProps[];
}

export const NavTab: React.FC<NavTabProps> = ({ tabs }) => {
    if (!tabs || !tabs.length) return null;

    return (
        <NavTabWrapper>
            {
                tabs.map(({ href, name, active }, index) => {
                    return (
                        <Link href={href} key={index}>
                            <a>
                                <NavItem active={active}>{name}</NavItem>
                            </a>
                        </Link>
                    );
                })
            }
        </NavTabWrapper>
    );
};
