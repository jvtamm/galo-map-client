import Link from 'next/Link';
import React, { Fragment } from 'react';
import { withRouter, useRouter, NextRouter } from 'next/router';

import { Container, MenuItem } from './styles';

export interface MenuItem {
    name: string;
    href: string;
    Icon: any;
}

interface MenuBarProps {
    items: MenuItem[];
    router: NextRouter;
}

const MenuBar: React.FC<MenuBarProps> = ({ items }: MenuBarProps) => {
    const router = useRouter();

    return (
        <Container>
            {items.map(({ Icon, href, name }) => {
                const isActive = router.route === href;

                return (
                    <Fragment key={name}>
                        <MenuItem active={isActive}>
                            <Link href={href}>
                                <a>
                                    <Icon />
                                </a>
                            </Link>
                        </MenuItem>
                    </Fragment>
                );
            })}
        </Container>
    );
};

export default withRouter(MenuBar);
