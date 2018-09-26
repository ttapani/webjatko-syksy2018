import Link from 'next/link';
import React from 'react';
import CountrySelector from './Containers/CountrySelector';
import Header from './Containers/Header';

const Home: React.SFC = () => {
  return (
    <div>
      <Header></Header>
      Hello World.{' '}
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
  )
}

export default Home;