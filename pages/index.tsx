import React from 'react';
import Layout from '../src/Layout/Layout';
import DashboardView from '../src/Views/DashboardView';

const IndexPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Dashboard"}>
            <DashboardView/>
        </Layout>
    );
}

export default IndexPage;