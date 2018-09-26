import Link from 'next/link';
import React from 'react';
import Clock from './Clock';
import CountrySelector from './Containers/CountrySelector';
import Header from './Containers/Header';

const Home: React.SFC = () => {
  const today = new Date();

  const printClocks = () => {
    let clocks = [];
    for(let i = 0; i < 10; ++i) {
      clocks.push(<Clock key={i}/>)
    }
    return clocks;
  }
  
  return (
    <div>
          <Header></Header>
    Hello World.{' '}
    <Link href="/about">
      <a>About</a>
    </Link>
    <div>
      <p>Tänään on {today.toLocaleDateString('fi')}</p>
    </div>
    <div>
      {printClocks()}
    </div>
    <div>
      <CountrySelector/>
    </div>
  </div>
  )
}

export default Home;