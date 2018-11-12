import React from 'react';
import Layout from '../src/Layout/Layout';
import UsersView from '../src/Views/UsersView';

const UsersPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Users"}>
            <UsersView/>
        </Layout>
    );
}

export default UsersPage;