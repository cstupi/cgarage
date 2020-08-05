// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const gpio = require('onoff').Gpio

const jwt = require('jsonwebtoken');
const pems = require('../pems.json')
const dotenv = require('dotenv')
dotenv.config()
const pem = pems[process.env.REGION][process.env.USER_POOL_ID][process.env.VERIFY_KEY]

// Declare a route
fastify.get('/garagedoor', async (request, reply) => {
  try {
    const userInfo = await new Promise((resolve,reject) => jwt.verify(request.headers['authorization'], pem, function(err, decoded) {
      if(err)
        reject(err)
      else
        resolve(decoded)
    }));
  } catch(err){
    fastify.log.error(err)
    reply.code(401)
    throw new Error('Forbidden')
  }
  fastify.log.info('Triggering garage door')
  let relay = null
  try {
    relay = new gpio(4,'out')
  } catch(err) {
    fastify.log.error(`Error initializing relay: ${err}`)
    throw err
  }
  try {
    relay.writeSync(0)
  } catch(err){
    fastify.log.error(`Garagedoor: ${err}`)
    throw err
  }
  await Promisify()
  return { result: 'success' }

  function Promisify() {
    return new Promise((resolve, reject) => {
      setTimeout(stop,150)
      function stop(){
        try {
          relay.writeSync(1)
          relay.unexport()
        } catch(err){
          reject(err)
        }
        resolve('done')
      }
    }) 
  }
  
  
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT,'0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
