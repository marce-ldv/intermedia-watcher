import type { ReactNode } from "react";

import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("~/components/molecules/Navbar").then((mod) => mod.CustomNavbar),
  {
    ssr: false,
  }
);

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen min-w-max flex-col items-center justify-center bg-gradient-to-b from-[#ece8e8] to-[#ffffff] dark:from-[#1e1e1e] dark:to-[#2e2e2e]">
        {children}
      </main>
    </>
  );
};
