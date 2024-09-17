import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Home, Layers, CreditCard, History, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="flex h-screen bg-background">
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-card text-card-foreground p-4"
      >
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link href="/dashboard/category" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
            <Layers size={20} />
            <span>Category</span>
          </Link>
          <Link href="/dashboard/credit" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
            <CreditCard size={20} />
            <span>Credit</span>
          </Link>
          <Link href="/dashboard/history" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
            <History size={20} />
            <span>History</span>
          </Link>
          <Link href="/dashboard/profile" className="flex items-center space-x-2 p-2 rounded hover:bg-accent">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      </motion.aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card text-card-foreground p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span>Welcome, {user?.firstName}!</span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};