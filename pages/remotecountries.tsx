import React from 'react';
import RemoteCountries from '../src/Containers/RemoteCountries';
import Header from '../src/Containers/Header';
import Head from 'next/head';

const RemoteCountriesPage: React.SFC<{}> = () => {
    return (
        <>
            <Head>
                <title>REST-Countries</title>
            </Head>
            <Header/>
            <RemoteCountries/>
        </>
    )
}

export default RemoteCountriesPage;