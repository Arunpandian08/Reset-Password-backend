import crypto from 'crypto'

const generateRandomString=(length)=>{
    return crypto.randomBytes(Math.floor(length/2))
    .toString('hex')  //Convert to hexadecimal format
    .slice(0,length) 
}
export default generateRandomString;