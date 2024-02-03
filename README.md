Copyright (C) Betr Beta Pte. Ltd. - All Rights Reserved
This contentents of this repository is confidential and only available to authorised individuals with the
permission of the copyright holders.
Unauthorised copying of this source code, via any medium is strictly prohibited. If you encounter this file and do not have
permission, please contact the copyright holders and delete this file.


# Getting Started Local Environment 

You need to run the auth-server and the client in parallel so you willl need two terminal instances.
You will need your own personal firebase project with authentication enabled.

- [setting up a firebase project](https://docs.flutterflow.io/data-and-backend/firebase/firebase-setup)
- Enable email and google sign in methods.
- Enable Anonymous sign in provider
- Enable Google signin provider

- replace the firebase environment credentials with those from your personal firease project. You must use the sameFirebase project for both fb-auth and ReleaseNotesManager
- If using VS Code for development, be sure to install `Headwind` for tailwindcss class sorting and `Prettier` for code formatting.

## Auth Server 

Run the following commands

For running locally you MUST use an emulator stack to allow your locally running servers to function correctly.

This means you must run `firebase init` in [./auth_server](./auth_server) then select `...local Emulators...` option (it is important NOT select anything else) then select `Functions` and `..Auth..` option. For the rest, accept the default options

Check that `auth_server/.firebaserc` names your firebase project
Do a string search on the whole repository for the text `<your project id>` and make sure to replace that value with your Firebase projectId

Change the URL named in your `auth_server/.env` to `http://127.0.0.1:5001/<your project id>/us-central1/api`

```bash
cd auth_server
npm install
firebase use <your-firebase-project-id>
npm run serve
```

NOTE: We've assumed that firebase cli is installed and configured in your system. If not, follow this link to get started with firebase cli <https://firebase.google.com/docs/cli#install_the_firebase_cli>

## Client

Clone the repo then:

```bash
cd client
npm install
```

Create a .env file at the root of the [./client](./client) and copy the contents of [./client/.env_template](./client/.env_template) into it. Follow the instructions on where to get the variable values. Take care to review all the defaul values and update them where needed to use yhose from your personal firebase project and emulatore environment.

Make sure that

1. You environment vars file is .env not .env.xyz
2. Make sure all env vars with "ENV" in them have `dev` as value. When this is done correct, the terminal should show the message `WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`
   The browser should also have a banner at the bottom stating `Running in emulator mode. Do not use with production credentials.`
3. Make sure that the value for `JWT_LIB_SECRET`, `JWT_ISSUER` and `JWT_AUDIENCE` is the same as with any other application that you expect to have authenticated communication with

```bash
npm run dev
```

The function url is of the format: `http://localhost>:\<port>/><project_id>/\<region>/api`

Navigate to `http://localhost:<your port>`.

To test signuo-with-token, append this string to the url of the signup page `?t=eyJhbGciOiJIUzI1NiJ9.eyJzdWJzY3JpcHRpb24iOiJSTk0tRnJlZSIsImZyb20iOiJybm0iLCJpYXQiOjE3MDQyNzA2MTIsImlzcyI6ImJldHJiZXRhIiwiYXVkIjoiYmV0cmJldGEiLCJleHAiOjE3MDQzNTcwMTJ9.5eY_Y1eVYH1lO6AurA4xohwBe_7ch0HkpO40HFvVLUw?locale=en`

# Production deployment

1. .firebaserc is using the same projectid as in your .env firebase variables

To deploy the app to production, install the dependencies in auth_server and client then configure your environment variables using your firebase credentials.

Once Configured, run

### auth server

```bash
cd auth_server
firebase deploy --only functions
```

### client

```bash
cd client
```

Then,

```bash
npm run build
firebase deploy --only hosting
```

Then make a get request to the claims api route to with the logged in user access token and uid added as headers e.g.

```javascript
fetch("your_url", {
  headers: {
    authorization: "Bearer <your user token>",
    uid: "<user uid>",
  },
});
```

You can change the claims route handler to add whatever roles you want.
