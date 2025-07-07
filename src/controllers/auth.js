import credentials from '../config/credentials'

const { PASSWORD } = credentials

// Simple token creation (not secure, just for demo)
const createToken = (password) => {
  if (password === PASSWORD) {
    const token = btoa(JSON.stringify({ 
      password: password, 
      timestamp: Date.now() 
    }))
    return token
  }
  return null
}

// Simple token verification
const verifyToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token))
    const now = Date.now()
    const tokenAge = now - decoded.timestamp
    const maxAge = 5 * 24 * 60 * 60 * 1000 // 5 days in milliseconds
    
    if (tokenAge > maxAge) {
      return false // Token expired
    }
    
    if (decoded.password === PASSWORD) {
      return decoded
    }
    return false
  } catch (error) {
    return false
  }
}

export { createToken, verifyToken } 