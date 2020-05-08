import jwt from 'jsonwebtoken';
import credentials from '../config/credentials'
let { SECRET } = credentials

const createToken = (string) => {
    let token = jwt.sign({ password: string }, SECRET,{ expiresIn: '5 days' } ) //'5 days'
    return token
}

const verifyToken = (token) => {
    try {
        let decoded = jwt.verify(token, SECRET)
        return decoded  
    } catch (error) {
        return false
    }
}

export { createToken, verifyToken }