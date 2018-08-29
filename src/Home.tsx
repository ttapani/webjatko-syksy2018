import Link from 'next/link';
import React from 'react';

const Home: React.SFC = () => (
    <div>
    Hello World.{' '}
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
)

export default Home;