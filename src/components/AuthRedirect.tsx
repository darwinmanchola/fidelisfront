'use client'

import themeConfig from '@/configs/themeConfig'
// Next Imports
import { redirect, usePathname } from 'next/navigation'


const AuthRedirect = () => {
  const pathname = usePathname()

  // ℹ️ Bring me `lang`
  const redirectUrl = `/auth/sign-in/?redirectTo=${pathname}`
  const login = `/auth/sign-in/`
  const homePage = themeConfig.homePageUrl

  return redirect(pathname === login ? login : pathname === homePage ? login : redirectUrl)
}

export default AuthRedirect
