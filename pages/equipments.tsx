import React from 'react';
import Layout from '../src/Layout/Layout';
import EquipmentsView from '../src/Views/EquipmentsView';

const EquipmentsPage: React.SFC<{}> = () => {
    return (
        <Layout title={"Equipments"}>
            <EquipmentsView/>
        </Layout>
    );
}

export default EquipmentsPage;