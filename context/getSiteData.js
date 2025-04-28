import { createContext, useContext } from 'react'

const Context = createContext(null)

export function SiteDataProvider({ siteData, children }) {
  return <Context.Provider value={siteData}>{children}</Context.Provider>
}

export const useSiteData = () => useContext(Context)
