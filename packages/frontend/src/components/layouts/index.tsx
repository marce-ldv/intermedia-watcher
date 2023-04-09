import type { ReactNode } from "react";
import { CustomNavbar } from "~/components/molecules/Navbar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CustomNavbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {children}
      </main>
      {/* Footer*/}
    </>
  );
};
