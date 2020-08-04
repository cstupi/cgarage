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
    relay.writeSync(1)
  } catch(err){
    fastify.log.error(`Garagedoor: ${err}`)
    throw err
  }
  await Promisify()
  return { result: 'success' }

  function Promisify() {
    return new Promise(resolve => {
      setTimeout(stop,100)
      function stop(){
        try {
        fastify.log.info('Done triggering garage door')
        relay.writeSync(0)
        relay.unexport()
        } catch(err){
          fastify.log.error(`Error closing gpio ${err}`)
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
