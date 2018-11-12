import React from 'react';
import Layout from '../src/Layout/Layout';
import LoansView from '../src/Views/LoansView';

const LoansPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Loans"}>
            <LoansView/>
        </Layout>
    );
}

export default LoansPage;