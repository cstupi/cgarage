import React from 'react'
import { GetServerSideProps } from 'next'
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth
} from '../auth'

class DoorInfo {
  Label: string
  Pin: Number
}

async function openGarage(token, pin) {
  const result = await fetch(`${process.env.PREFIX ?? ''}/api/garagedoor/${pin}`, { headers: new Headers({ 'authorization': token})})
  const data = await result.json()
  console.log(data)
}

const doors = process.env.DOOR_DATA ? process.env.DOOR_DATA as unknown as DoorInfo[] : [{ Label: 'Open', Pin: 4 }]
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
            { doors.map(((d: DoorInfo) =>  <button type="button" key={d.Label} onClick={async () => 
              await openGarage(auth.accessToken, d.Pin)}>{d.Label}</button>)) }
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