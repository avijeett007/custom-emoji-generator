import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProfileForm } from '@/components/profile/ProfileForm';

const Profile: React.FC = () => {
  return (
    <Layout>
      <h1>User Profile</h1>
      <ProfileForm />
    </Layout>
  );
};

export default Profile;