import React from 'react';
import Header from '../src/Containers/Header';
import Head from 'next/head';
import CountryInfo from '../src/Containers/CountryInfo';

const CountryInfoPage: React.SFC<{}> = () => {
    return (
        <>
            <Head>
                <title>Country into</title>
            </Head>
            <Header/>
            <div style={{ paddingTop: 70, paddingLeft: 10 }}>
                <CountryInfo/>
            </div>
            
        </>
    )
}

export default CountryInfoPage;