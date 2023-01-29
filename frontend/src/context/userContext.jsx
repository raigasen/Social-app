import { memo, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useAxios } from '../utils/apiCalls'

export const AuthContext = createContext(1)

export const UserProvider = ({ children }) => {
  const sessionValue = localStorage.getItem('session')
  let parsedSessionValue = null
  if (sessionValue) parsedSessionValue = sessionValue

  const userValue = localStorage.getItem('user')
  let parsedUserValue = null
  if (sessionValue) parsedUserValue = JSON.parse(userValue)

  const [session, setSession] = useState(parsedSessionValue)
  const [user, setUser] = useState(parsedUserValue)

  // const [, error, setError, loading, operation] = useAxios()

  useEffect(() => {
    localStorage.setItem('session', session)
    localStorage.setItem('user', JSON.stringify(user))
  }, [user, session])

  return (
    <AuthContext.Provider
      value={{ session, user, error: '', setUser, setError: null, setSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}
