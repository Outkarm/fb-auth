'use client'

import firebase_app from '@/firebase/config'
import logger from '@/logger'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  connectAuthEmulator,
  getRedirectResult,
} from 'firebase/auth'
import { APP_ENV } from '@/utils/constants'

class Authenticator {
  #app

  constructor() {
    this.#app = getAuth(firebase_app)
    this.providers = {
      google: new GoogleAuthProvider(),
    }

    const currentEnv = APP_ENV
    if (currentEnv?.toLocaleLowerCase() === 'dev') {
      connectAuthEmulator(this.#app, 'http://127.0.0.1:9099')
    }
  }

  /**
   * Current initialiazed firebase app instance
   */
  get fbAuthInstance() {
    return this.#app
  }

  get currentUser() {
    return this.fbAuthInstance.currentUser
  }

  #validateEmailAndPassword(email, password) {
    if (email.length <= 0 || password.length <= 0) {
      throw "Please ensure that you've entered a valid email and password."
    }

    return
  }

  async signinEmailAndPassword(email, password) {
    this.#validateEmailAndPassword(email, password)

    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.fbAuthInstance, email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  async signupEmailAndPassword(email, password) {
    this.#validateEmailAndPassword(email, password)

    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(this.fbAuthInstance, email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  async signout() {
    return new Promise((resolve, reject) => {
      signOut(this.fbAuthInstance)
        .then((res) => {
          localStorage.clear()
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  // async authWithGoogle() {
  //   try {
  //     this.providers.google.addScope("email");
  //     await signInWithRedirect(this.fbAuthInstance, this.providers.google);
  //     return;
  //   } catch (error) {
  //     console.log("Error, Could not authenticate with google, ", error);
  //     return;
  //   }
  // }

  async signInWithPopupGoogle() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await signInWithPopup(this.#app, this.providers.google)

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user

        // IdP data available using getAdditionalUserInfo(result)

        // Resolve with the user object
        resolve(user)
      } catch (error) {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message

        // The email of the user's account used.
        // const email = error.customData.email;
        // console.log(email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error('Error during Google sign-in:', credential, error)

        // Reject with the error object
        reject(error)
      }
    })
  }

  async handleAuthRedirects() {
    try {
      const results = await getRedirectResult(this.fbAuthInstance)
      return results
    } catch (error) {
      console.log('Error, Could not get redirect results, ', error)
      return
    }
  }

  /**
   * Send an email to user by email to reset password.
   * @param {email} email
   * @returns
   */
  async requestPasswordReset(email) {
    return await sendPasswordResetEmail(this.fbAuthInstance, email)
  }

  async passwordReset(newPassword, token) {
    return await confirmPasswordReset(this.fbAuthInstance, token, newPassword)
  }

  /**
   * Sends a verification email for unverified user emails
   * @returns
   */
  async verifyEmail() {
    return await sendEmailVerification(this.currentUser)
  }

  /**
   * Checks whether email is verified.
   * @return boolean
   */
  async isEmailVerified() {
    return this.currentUser.emailVerified
  }

  async deleteUser() {
    try {
      await this.fbAuthInstance.currentUser.delete()
      console.info("Deleted current user's details")
      return true
    } catch (error) {
      console.log('error deleting user', error)
      return false
    }
  }

  async additionalUserInfo() {
    try {
      const values = await this.currentUser.getIdTokenResult()
      console.log(values)
      return {
        token: values.token,
        roles: values.claims.roles,
      }
    } catch (error) {
      console.error('Could not get additional information.', error)
      return { token: undefined, roles: undefined }
    }
  }
}

/**
 * Authenticator instance
 */
const authenticator = new Authenticator()
export default authenticator
