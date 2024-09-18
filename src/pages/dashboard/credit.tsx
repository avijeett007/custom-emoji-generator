// src/pages/dashboard/credit.tsx
import React from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreditMenu } from '@/components/dashboard/CreditMenu';

const CreditPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Credit Management</h1>
        <CreditMenu />
      </div>
    </DashboardLayout>
  );
};

export default CreditPage;