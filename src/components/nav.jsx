"use client";

import Link from "next/link";
import Button from "./button";
import AppLogo from "./app-logo";

export default function Nav() {
  return (
    <nav>
      <div className="container flex items-center min-h-[60px] justify-between text-lg">
        <div>
          <AppLogo />
        </div>

        <div className="flex items-center">
          <ul className="flex items-center gap-8 font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/price">Price</Link>
            </li>
          </ul>

          <Link href="/signin">
            <Button btn="primary" className="ml-8">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
