
const gpio = require('onoff').Gpio

module.exports = class PinControl {
  constructor() {
  }
  static async TogglePin(pin) {
    let relay = null
    try {
      relay = new gpio(pin,'out')
    } catch(err) {
      throw err
    }
    try {
      relay.writeSync(0)
    } catch(err){
      throw err
    }
    await WaitAndCLose()
    return
  
    function WaitAndCLose() {
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
  }
}