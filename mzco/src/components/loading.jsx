import React from 'react';
import { motion } from 'framer-motion';

function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      exit={{opacity:0}}
      className="h-screen w-screen bg-white bg-blend-lighten fixed pointer-events-none top-0 z-[99999] flex justify-center items-center"
    >
      {/* You can add a spinner or logo here if needed */}
    </motion.div>
  );
}

export default Loading;


