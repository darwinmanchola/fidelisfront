// Third-party Imports
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'
export default async function AuthGuard({ children }: { children: ReactNode }) {
  const session = await getServerSession()

  return <>{session ? children: <AuthRedirect/>}</>
}
