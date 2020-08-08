import React from 'react'
import { GetServerSideProps } from 'next'
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth
} from '../auth'


async function openGarage(token) {
  const result = await fetch(`${process.env.PREFIX ?? ''}/api/garagedoor`, { headers: new Headers({ 'authorization': token})})
  const data = await result.json()
  console.log(data)
}


const Home = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth)
  const { login, logout } = useAuthFunctions()
  return (
    <React.Fragment>
      <style jsx>{`
          button {
            font-size: 1.2em;
            font-weight: bold;
            margin: 5em;
            border-radius: 2em;
            border-width: 0;
            padding: 1em;
          } 
          button:hover {
            border-color: black;
            border-width: .2em;
            border-style: solid
          }
          .sign {
            height: 5em;
            width: 10em;
          }
          `}</style>
      {auth ? (
        <div>
          <div>
            <button type="button" className="sign" onClick={() => logout()}>
              sign out
            </button>
          </div>
          <div>
          </div>
          <div>
            <button type="button" onClick={async () => await openGarage(auth.accessToken)}>Open Dublin Garage Door</button>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <button type="button" className="sign" onClick={() => login()}>
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