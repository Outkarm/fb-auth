import { SignJWT } from 'jose'
import { JWT_INFO } from './constants'
import mixpanel from '@/services/mixpanel'

//utility function to generate an access token
/**
 * utility function to generate an access token
 * @param data Payload to be encoded in the token
 * @returns token || error
 */
export default async function generateAccessToken(data = {}) {
  try {
    const secret = new TextEncoder().encode(JWT_INFO.jwtLibSecret || 's£cret@123'),
      alg = 'HS256',
      token = await new SignJWT({ ...data })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(JWT_INFO.jwtIssuer)
        .setAudience(JWT_INFO.jwtAudience)
        .setExpirationTime('24h')
        .sign(secret)

    return token
  } catch (error) {
    mixpanel.track('Error Event', {
      error_message: error.message,
      stack_trace: error.stack,
    })
    throw error
  }
}
