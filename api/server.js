// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const jwt = require('jsonwebtoken');
const pems = require('../pems.json')
const PinControl = require('./service')
const dotenv = require('dotenv')
dotenv.config()


const pem = pems[process.env.REGION][process.env.USER_POOL_ID][process.env.VERIFY_KEY]
const garageCtrl = async (req, res, pin) => {
  fastify.log.info(`triggering garage on port ${pin}`)
  if(!process.env.DEVELOPMENT){
    try {
      const userInfo = await new Promise((resolve,reject) => jwt.verify(req.headers['authorization'], pem, function(err, decoded) {
        if(err)
          reject(err)
        else
          resolve(decoded)
      }));
    } catch(err){
      fastify.log.error(err)
      res.code(401)
      throw new Error('Forbidden')
    }
  } else {
    return { result: 'stub response' }
  }
  
  try {
    
    await PinControl.TogglePin(pin);
    return { result: 'success' }
  } catch(err) {
    fastify.log.error(err)
    throw err;
  }
}
// Declare a route
fastify.get('/garagedoor/:pin', async (req, res) => {
  let pin = 4
  if(req.params.pin && !isNaN(req.params.pin))
    pin = req.params.pin
  return await garageCtrl(req, res, pin)
})
fastify.get('/garagedoor', async (req, res) => {
  return await garageCtrl(req,res, 4)
})
// Run the server!
const start = async () => {
  try {
    console.log(`DEVELOPMENT: ${process.env.DEVELOPMENT}`)
    await fastify.listen(process.env.PORT,'0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
