import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import Reveal from "./reveal";
import heroImage from "@/assets/images/hero.png";

export default function Hero() {
  return (
    <div className="container py-16 md:py-20 grid lg:grid-cols-2 gap-x-3 gap-y-8">
      <div className="text-center max-w-2xl mx-auto lg:order-1">
        <Reveal>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800">
            Discover efficiency by managing all your tasks using Stanpe
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sm:text-xl font-medium mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            error libero vero inventore ipsa, debitis harum et. Lorem ipsum
            dolor sit amet.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Link href="/signin">
            <Button btn="primary" className="mt-7 text-xl">
              Let’s Explore
            </Button>
          </Link>
        </Reveal>
      </div>
      <div>
        <Reveal delay={1} className="w-fit mx-auto xl:ml-0">
          <Image width={500} src={heroImage} priority />
        </Reveal>
      </div>
    </div>
  );
}
