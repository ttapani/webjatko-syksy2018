import Link from 'next/link';
import React from 'react';

const today = new Date();

const Home: React.SFC = () => (
    <div>
    Hello World.{' '}
    <Link href="/about">
      <a>About</a>
    </Link>
    <p>Tänään on {today.toLocaleDateString('fi')}</p>
  </div>
)

export default Home;