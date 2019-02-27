import React from 'react';
import Layout from '../src/Layout/Layout';
import ProfileView from '../src/Views/ProfileView';

const ProfilePage: React.SFC<{}> = () => {
    return (
        <Layout title={"Profile"}>
            <ProfileView />
        </Layout>
    );
}

export default ProfilePage;