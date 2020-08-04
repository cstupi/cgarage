CGarage

API will send signal to garage door
Web will provide a way for users to send requests to the api and authenticate

sample next.config.js:   
module.exports = (phase) => {  
  switch(phase) {  
    case 'phase-development-server':  
      return {   
        env: {  
          REGION: 'us-east-1',  
          IDP_DOMAIN: 'COGNITO DOMAIN',  
          USER_POOL_ID: 'POOL ID', 
          USER_POOL_CLIENT_ID: 'CLIENT ID',   
          REDIRECT_SIGN_IN: 'http://localhost:3000/token',   
          REDIRECT_SIGN_OUT: 'http://localhost:3000/',   
          AUTH_COOKIE_DOMAIN: 'localhost',   
          VERIFY_KEY: 'PEM KEY API SHOULD USE TO VERIFY JWT',
          GARAGE_API: 'localhost:8080'  
        }   
      }  
    default:   
      return {  
        env: {  
          REGION: 'us-east-1',  
          IDP_DOMAIN: 'COGNITO DOMAIN',  
          USER_POOL_ID: 'POOL ID',  
          USER_POOL_CLIENT_ID: 'CLIENT ID',  
          REDIRECT_SIGN_IN: 'http://localhost:3000/token',  
          REDIRECT_SIGN_OUT: 'http://localhost:3000/',  
          AUTH_COOKIE_DOMAIN: 'localhost',  
          VERIFY_KEY: 'PEM KEY API SHOULD USE TO VERIFY JWT',  
          GARAGE_API: 'localhost:8080'  
        }  
      }  
  }  
}  
