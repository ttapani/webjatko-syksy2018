import React from 'react';
import RemoteCountries from '../src/Containers/RemoteCountries';
import Layout from '../src/Layout/Layout';

const RemoteCountriesPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Remote countries"}>
            <RemoteCountries/>
        </Layout>
    );
}

export default RemoteCountriesPage;