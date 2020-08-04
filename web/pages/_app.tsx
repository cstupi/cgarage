import React from 'react'
import {AppProps} from 'next/app'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

Amplify.configure({
  Auth: {
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
    cookieStorage: {
      domain: process.env.AUTH_COOKIE_DOMAIN,
      path: '/',
      expires: 365,
      secure: false
    }
  }
})
Auth.configure({
  oauth: {
    domain: process.env.IDP_DOMAIN,
    scope: ['email','openid'],
    redirectSignIn: process.env.REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REDIRECT_SIGN_OUT,
    responseType: 'token'
  }
})
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default App