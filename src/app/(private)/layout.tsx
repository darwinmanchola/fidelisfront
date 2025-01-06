import { ReactNode } from "react";

import LayoutProvider from "@/providers/LayoutProvider";
import Providers from "@/providers/Providers";
import AuthGuard from "@/hocs/AuthGuard";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {

  
  return (
    <>
    <Providers>
    <AuthGuard>
        <LayoutProvider>
            {children}
        </LayoutProvider>  
    </AuthGuard>  
    </Providers>
    </>

  );
};

export default Layout; 