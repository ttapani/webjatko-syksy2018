import React from 'react';
import Clock from '../src/Containers/Clock';
import Header from '../src/Containers/Header';

const ClocksPage: React.SFC<{}> = () => {
    const today = new Date();
    const printClocks = () => {
        let clocks = [];
        for(let i = 0; i < 10; ++i) {
          clocks.push(<Clock key={i}/>)
        }
        return clocks;
      }

    return (
        <>
            <Header/>
            <p>Tänään on {today.toLocaleDateString('fi')}</p>
            <div>
                {printClocks()}
            </div>
        </>
    )
}

export default ClocksPage;