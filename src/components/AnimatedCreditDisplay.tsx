import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCredits } from '@/contexts/CreditContext';

export const AnimatedCreditDisplay: React.FC = () => {
  const { state } = useCredits();
  const [displayedCredits, setDisplayedCredits] = useState(state.credits);

  useEffect(() => {
    setDisplayedCredits(state.credits);
  }, [state.credits]);

  return (
    <div className="flex items-center">
      <span className="mr-2">Credits:</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayedCredits}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-lg"
        >
          {displayedCredits}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};