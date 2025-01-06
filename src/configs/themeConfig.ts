
export type Config = {
  templateName: string
  homePageUrl: string
  appName: string
  description:string
  dashboardPageUrl:string
}

const themeConfig: Config = {
  templateName: 'Fidelis',
  appName:'Fidelis App',
  homePageUrl: '/',
  dashboardPageUrl:'/blank-page/',
  description:"Software hecho para ayudar al manejo parroquial"
  
}

export default themeConfig
