import React from 'react'
import { GetServerSideProps } from 'next'
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth
} from '../auth'
async function openGarage() {
  const result = await fetch('/api/garagedoor')
  const data = await result.json()
  console.log(data)
}
const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth)
  const { login, logout } = useAuthFunctions()

  return (
    <React.Fragment>
      {auth ? (
        <div>
          <style jsx>{`
          button {
            margin: 40px;
          } 
          `}</style>
          <div>
            <button type="button" onClick={() => logout()}>
              sign out
            </button>
          </div>
          <div>
            <button className="button" type="button" onClick={async () => await openGarage()}>Open Dublin Garage Door</button>
          </div>
        </div>
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