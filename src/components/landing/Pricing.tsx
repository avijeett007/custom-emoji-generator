import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useCredits } from '@/hooks/useCredits';

export const Pricing: React.FC = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { upgradeToPremium } = useCredits();

  const plans = [
    { name: "Free Tier", price: "$0/month", features: ["3 emojis per month", "Basic customization", "Community support"] },
    { name: "Premium Tier", price: "$9.99/month", features: ["Unlimited emojis", "Advanced customization", "Priority support", "Early access to new features"] }
  ];

  const handlePremiumUpgrade = async () => {
    if (!isSignedIn) {
      router.push('/sign-up');
    } else {
      await upgradeToPremium();
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="mb-2">✓ {feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={index === 1 ? handlePremiumUpgrade : () => router.push('/sign-up')}
                >
                  {index === 0 ? "Get Started" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};