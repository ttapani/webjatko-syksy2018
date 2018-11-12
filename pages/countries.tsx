import React from 'react';
import CountrySelector from '../src/Containers/CountrySelector';
import Layout from '../src/Layout/Layout';

const CountriesPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Countries"}>
                <CountrySelector/>
        </Layout>
    )
}

export default CountriesPage;