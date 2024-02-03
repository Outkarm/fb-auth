"use client";

import authenticator from "@/firebase/authenticator";
import { SERVER_URLS } from "@/utils/constants";
import logger from "@/logger";

export default async function sendRequestToAuthServer(route) {
  try {
    console.log("Sending request to auth server with parameters: ", route);
    const { token } = await authenticator.additionalUserInfo();

    const res = await fetch(`${SERVER_URLS.authServer}/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status >= 400) {
      console.error("RsendRequestToAuthServerequest failed");
      throw "Failed request";
    }

    return res;
  } catch (error) {
    console.error("Request error", error);
    return "Could not make request";
  }
}
