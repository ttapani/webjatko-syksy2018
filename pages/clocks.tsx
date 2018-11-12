import React from 'react';
import Clock from '../src/Containers/Clock';
import Layout from '../src/Layout/Layout';

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
        <Layout title={"Clocks"}>
            <p>Tänään on {today.toLocaleDateString('fi')}</p>
            <div>
                {printClocks()}
            </div>
        </Layout>
    )
}

export default ClocksPage;