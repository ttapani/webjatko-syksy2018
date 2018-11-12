import React from 'react';
import Layout from '../src/Layout/Layout';

const IndexPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Dashboard"}>
            <p>Welcome to Loan system.</p>
        </Layout>
    );
}

export default IndexPage;