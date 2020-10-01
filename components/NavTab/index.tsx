import React from 'react';
// import Link from 'next/Link';
// import { UrlObject } from 'url';

import { NavTabWrapper, NavItem } from './styles';

export interface TabsProps {
    // href: UrlObject;
    handler: () => void;
    name: string;
    identifier: string;
    active: boolean
}

export interface NavTabProps {
    tabs: TabsProps[];
}

export const NavTab: React.FC<NavTabProps> = ({ tabs }) => {
    if (!tabs || !tabs.length) return null;

    return (
        <NavTabWrapper>
            {
                tabs.map(({ handler, name, active }, index) => {
                    return (
                        <NavItem
                            disabled={active}
                            active={active}
                            onClick={handler}
                            key={index}>
                            {name}
                        </NavItem>
                    );
                    // return (
                    //     <Link href={href} key={index}>
                    //         <a>
                    //             <NavItem active={active}>{name}</NavItem>
                    //         </a>
                    //     </Link>
                    // );
                })
            }
        </NavTabWrapper>
    );
};
