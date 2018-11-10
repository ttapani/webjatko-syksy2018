import React from 'react';
import Layout from '../src/Layout/Layout';

const IndexPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Front page"}>
            <p>Etusivu</p>
        </Layout>
    );
}

export default IndexPage;