// Next Imports
import { redirect } from 'next/navigation'

// Third-party Imports
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import themeConfig from '@/configs/themeConfig'

const GuestOnlyRoute = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession()

  if (session) {
    redirect(themeConfig.dashboardPageUrl)
  }

  return <>{children}</>
}

export default GuestOnlyRoute
