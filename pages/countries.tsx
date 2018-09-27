import React from 'react';
import CountrySelector from '../src/Containers/CountrySelector';
import Header from '../src/Containers/Header';
import Head from 'next/head';

const CountriesPage: React.SFC<{}> = () => {
    return (
        <>
            <Head>
                <title>Countries</title>
            </Head>
            <Header/>
            <div style={{ paddingTop: 74, paddingLeft: 10 }}>
                <CountrySelector/>
            </div>
        </>
    )
}

export default CountriesPage;