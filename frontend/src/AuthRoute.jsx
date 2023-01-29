import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/userContext'

function AuthRoute ({ children }) {
  const { session } = useAuth()
  if (session === 'null' || session == null) {
    return <Navigate to='/login' replace={true} />
  }
  return children
}

export default AuthRoute
