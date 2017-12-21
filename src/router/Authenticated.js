import React from 'react'
import InternalRoute from './InternalRoute'

const getRedirectPath = pathname => {
  const isLoggedIn = localStorage.getItem('token') !== null
  if (isLoggedIn) {
    if (pathname === '/' || pathname === '/signup') {
      return { isValidRedirection: false, redirectToPath: '/dashboard' }
    }
  }
  else if (pathname === '/dashboard') {
    return { isValidRedirection: false, redirectToPath: '/' }
  }
  return undefined
}


const Authenticated = ({ ...properties }) => {
  let redirectInfo = getRedirectPath(properties.location.pathname)
  redirectInfo = redirectInfo || { isValidRedirection: true, redirectToPath: '/dashboard' }
  return (
    <InternalRoute
      isValidRedirection={redirectInfo.isValidRedirection}
      redirectToPath={redirectInfo.redirectToPath}
      {...properties}
    />)
}

export default Authenticated
