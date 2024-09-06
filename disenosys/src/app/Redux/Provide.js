"use client"

import React from 'react'
import store from "./store.js"
import { Provider } from 'react-redux'

export function Providers({children}) {
  return (
   <Provider store={store}>
    {children}
   </Provider>
  )
}
