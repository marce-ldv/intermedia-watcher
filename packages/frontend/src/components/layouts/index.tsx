import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("~/components/molecules/Navbar").then((mod) => mod.CustomNavbar), {
  ssr: false,
});

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {children}
      </main>
      {/* Footer*/}
    </>
  );
};
