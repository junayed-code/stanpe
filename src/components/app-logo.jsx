import { stagger, useAnimate } from "framer-motion";
import Link from "next/link";

const AppLogo = () => {
  const [scope, animate] = useAnimate();

  const handleMouseEnter = () => {
    animate([[".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }]]);
  };

  const handleMouseLeave = () => {
    animate(".letter", { y: 0 }, { duration: 0.2, delay: stagger(0.05) });
  };

  return (
    <Link
      ref={scope}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href="/"
      className="select-none text-3xl font-bold inline-block"
    >
      <span className="sr-only">stanpe</span>
      <span
        aria-hidden
        className="flex items-center leading-none h-8 overflow-hidden"
      >
        {"stanpe".split("").map((letter, i) => (
          <span
            aria-hidden
            data-letter={letter}
            className="letter h-8 inline-block relative after:absolute after:content-[attr(data-letter)] after:h-full after:left-0 after:top-full"
            key={`${letter}-${i}`}
          >
            {letter}
          </span>
        ))}
      </span>
    </Link>
  );
};

export default AppLogo;
