import { db } from './connect'

export const register = async (email: string, password: string): Promise<string | null> => {
  try {
    const token = await db.signup({
      namespace: 'test',
      database: 'test',
      access: 'Auth',
      variables: {      
        email: email,
        password: password
      }
    })

    return token
  } catch (e) {
    console.error(e)
    return null
  }
}

export const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const token = await db.signin({
      namespace: 'test',
      database: 'test',
      access: 'Auth',
      variables: {
        email: email,
        password: password
      }
    })

    return token
  } catch (e) {
    console.error(e)
    return null
  }
}

export const authenticate = async (token: string): Promise<boolean> => {
  try {
    const isAuthenticated = await db.authenticate(token)
    return isAuthenticated
  } catch {
    return false
  }
}
