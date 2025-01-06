import { ReactNode } from "react";

import LayoutProvider from "@/providers/LayoutProvider";
import Providers from "@/providers/Providers";
import AuthGuard from "@/hocs/AuthGuard";
import GuestOnlyRoute from "@/hocs/GuestOnlyRoute";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {

  
  return (
   
    <GuestOnlyRoute>
        {children}  
    </GuestOnlyRoute>

  );
};

export default Layout; 