"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, duration = 0.4, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: "circOut" },
      }}
    >
      {children}
    </motion.div>
  );
}
