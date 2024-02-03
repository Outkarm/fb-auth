// Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  adminProjectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
}

//JWT info
export const JWT_INFO = {
  jwtLibSecret: process.env.JWT_LIB_SECRET,
  jwtIssuer: process.env.JWT_ISSUER,
  jwtAudience: process.env.JWT_AUDIENCE,
}

// Server URLs
export const SERVER_URLS = {
  authServer: process.env.NEXT_PUBLIC_SERVER_URL,
  appStatusRest: process.env.NEXT_PUBLIC_APP_STATUS_REST_URL,
  rnm: process.env.NEXT_PUBLIC_RNM_URL,
  //host: process.env.NEXT_PUBLIC_HOST_URL,
}

// App environment (still to be implemented support)
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV
