export interface User {
    id: string;
    clerkId: string;
    tier: 'FREE' | 'PREMIUM';
    credits: number;
    createdAt: Date;
    updatedAt: Date;
  }