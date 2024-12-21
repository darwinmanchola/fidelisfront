"use client";

import React, { useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import LeftSidebarMenu from "@/components/Layout/LeftSidebarMenu";
import TopNavbar from "./../components/Layout/TopNavbar/index";
import Footer from "@/components/Layout/Footer";
import ControlPanel from "@/components/Layout/ControlPanel";
import { useSession } from "next-auth/react";

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [active, setActive] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const toggleActive = () => {
    setActive(!active);
  };

  const isAuthPage = [
    "/authentication/sign-in/",
    "/authentication/sign-up/",
    "/authentication/forgot-password/",
    "/authentication/reset-password/",
    "/authentication/confirm-email/",
    "/authentication/lock-screen/",
    "/authentication/logout/",
    "/coming-soon/",
    "/",
    "/front-pages/features/",
    "/front-pages/team/",
    "/front-pages/faq/",
    "/front-pages/contact/",
  ].includes(pathname);

  React.useEffect (() => {
    if (status === "unauthenticated" && !isAuthPage) {
      router.push("/authentication/sign-in");
    }
  }, [status, isAuthPage, router]);

  if (status === "loading") {
    return <div>Cargando...</div>;
  }


  return (
    <>
      <div className={`main-wrapper-content ${active ? "active" : ""}`}>
        {!isAuthPage &&  session && (
          <>
            <TopNavbar toggleActive={toggleActive} />

            <LeftSidebarMenu toggleActive={toggleActive} />
          </>
        )}

        <div className="main-content">
          {children}

          {!isAuthPage && session && <Footer />}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          zIndex: "-5",
          opacity: 0,
          visibility: "hidden",
        }}
      >
        <ControlPanel />
      </div>
    </>
  );
};

export default LayoutProvider;
