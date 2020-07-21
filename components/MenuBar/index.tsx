import Link from 'next/Link';
import React, { Fragment } from 'react';
import { withRouter, useRouter, NextRouter } from 'next/router';

import { Container, MenuButton } from './styles';

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
                        <Link href={href}>
                            <MenuButton active={isActive}>
                                <Icon />
                            </MenuButton>
                        </Link>
                    </Fragment>
                );
            })}
        </Container>
    );
};

export default withRouter(MenuBar);
