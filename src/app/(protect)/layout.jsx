"use client";

import useAuth from "@/hooks/useAuth";
import { redirect, usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const layout = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!loading && !currentUser && pathname.includes("/dashboard")) {
      redirect("/signin", "replace");
    }

    if (!loading && currentUser && pathname.includes("/sign")) {
      redirect("/dashboard", "replace");
    }
  }, [currentUser?.email]);

  return (
    <>
      {/* {loading && (
        <div className="fixed grid place-items-center inset-0 bg-black/10 text-3xl font-medium text-center text-slate-700">
          {" "}
          Loading...{" "}
        </div>
      )} */}
      {children}
    </>
  );
};

export default layout;
