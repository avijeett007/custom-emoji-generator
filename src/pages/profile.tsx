// src/pages/profile.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProfileForm } from '@/components/profile/ProfileForm';

const Profile: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Profile;