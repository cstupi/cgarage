import React from 'react'
import { GetServerSideProps } from 'next'
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth
} from '../auth'

const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth)
  const { login, logout } = useAuthFunctions()

  return (
    <React.Fragment>
      {auth ? (
        <button type="button" onClick={() => logout()}>
          sign out
        </button>
      ) : (
        <React.Fragment>
          <button type="button" onClick={() => login()}>
            sign in
          </button>
        </React.Fragment>
      )
      }
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<{
  initialAuth: AuthTokens
}> = async (context) => {
  const initialAuth = getServerSideAuth(context.req)
  return { props: {initialAuth}}
}
export default Home