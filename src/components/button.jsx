"use client";

import { motion } from "framer-motion";

const bgColor = {
  primary: "#6366f1",
  secondary: "#3b82f6",
  default: "#475569",
};

const shadowColor = {
  primary: "#c7d2fe",
  secondary: "#bfdbfe",
  default: "#334155",
};

/**
 *
 * @param {{ btn: 'primary' | 'secondary' | 'default' } & import("react").ButtonHTMLAttributes & import("framer-motion").AnimationProps} param0
 */
const Button = ({
  children,
  className = "",
  btn = "default",
  transition,
  ...rest
}) => {
  return (
    <motion.button
      {...rest}
      whileTap={{
        transition: { duration: 0.3, delay: 0 },
        scale: 0.95,
        boxShadow: "0 0 0 0",
      }}
      whileHover={{
        transition: { duration: 0.3, delay: 0 },
        boxShadow: `0px 0px 0 5px ${shadowColor[btn]}`,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        ...transition,
      }}
      style={{ backgroundColor: bgColor[btn] }}
      className={"font-medium p-[0.42em_1.15em] rounded-full inline-flex items-center justify-center gap-x-3 text-slate-100 disabled:opacity-35 "
        .concat(className)
        .trim()}
    >
      {children}
    </motion.button>
  );
};

export default Button;
