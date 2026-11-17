import { createContext, useContext } from 'react'

export const ViewContext = createContext({
  currentView: 'home',
  navigateTo: () => {},
})

export const useView = () => useContext(ViewContext)
