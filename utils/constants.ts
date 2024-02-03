//JWT info
export const JWT_INFO = {
  jwtLibSecret: process.env.JWT_LIB_SECRET,
  jwtIssuer: process.env.JWT_ISSUER,
  jwtAudience: process.env.JWT_AUDIENCE,
}

export const SERVER_URLS = {
  authServerUrl: process.env.NEXT_PUBLIC_AUTHENTICATION_SERVER_URL,
  rnmServerUrl: process.env.NEXT_PUBLIC_RNM_URL,
}
