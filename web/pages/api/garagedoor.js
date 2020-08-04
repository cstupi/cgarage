var jwt = require('jsonwebtoken');
import pems from '../../../pems.json'
const pem = pems[process.env.REGION][process.env.USER_POOL_ID][process.env.VERIFY_KEY]

export default async (req, res) => {
  try {
    const userInfo = await new Promise((resolve,reject) => jwt.verify(req.headers['authorization'], pem, function(err, decoded) {
      if(err)
        reject(err)
      else
        resolve(decoded)
    }));
  } catch(err){
    res.statusCode = 401
    res.json({ message: 'forbidden'})
    return
  }

 
  try {
    const result = await fetch(`${process.env.GARAGE_API}/garagedoor`)
    res.statusCode = 200
    res.json({ text: await result.text() })
  } catch(err) {
    res.statusCode = 500
    res.json({ error: err })
  }
}
