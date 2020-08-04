// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const gpio = require('onoff').Gpio

// Declare a route
fastify.get('/garagedoor', async (request, reply) => {
  fastify.log.info('Triggering garage door')
  return { result: 'success' }
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
    await fastify.listen(8080,'0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
