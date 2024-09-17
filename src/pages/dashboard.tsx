import React from 'react';
import { GetServerSideProps } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EmojiGenerator } from '@/components/emoji/EmojiGenerator';
import { CreditDisplay } from '@/components/dashboard/CreditDisplay';
import { EmojiList } from '@/components/dashboard/EmojiList';
import { useCredits } from '@/hooks/useCredits';

const Dashboard: React.FC = () => {
  const { credits } = useCredits();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EmojiGenerator />
          </div>
          <div>
            <CreditDisplay credits={credits} />
          </div>
        </div>
        <div className="mt-8">
          <EmojiList emojis={[]} />
        </div>
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

export default Dashboard;