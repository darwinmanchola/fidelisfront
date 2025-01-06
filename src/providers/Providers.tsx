
// Context Imports
import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { ReactNode } from 'react'



const Providers = (props: { children: ReactNode }) => {
  // Props
  const { children } = props


  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      {children}
    </NextAuthProvider>
  )
}

export default Providers
