import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';
import { withRouter, SingletonRouter } from 'next/router';

interface IMenuItemProps {
    href?: string;
    router?: SingletonRouter;
    disabled?: boolean;
}

const MenuItem: React.SFC<IMenuItemProps> = (props) => {
    return (
        <Link href={props.href || ''}>
            <ListItem button={true} selected={props.router.pathname === props.href} disabled={props.disabled}>
                {props.children}
            </ListItem>
        </Link>
    );
};

export default withRouter(MenuItem);