import React from 'react';
import CountrySelector from '../src/Containers/CountrySelector';
import Header from '../src/Containers/Header';

const CountriesPage: React.SFC<{}> = () => {
    return (
        <>
            <Header/>
            <CountrySelector/>
        </>
    )
}

export default CountriesPage;