import React from 'react'

export const UserContext = React.createContext({ user: "", setUser: (a: string) => { } })
export const UserProvider = UserContext.Provider;