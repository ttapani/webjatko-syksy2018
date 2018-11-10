import React from 'react';
import CountryInfo from '../src/Containers/CountryInfo';
import Layout from '../src/Layout/Layout';

const CountryInfoPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Country info"}>
            <CountryInfo/>
        </Layout>
    );
}

export default CountryInfoPage;