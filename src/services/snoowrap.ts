import Snoowrap from "snoowrap";

function buildRequester(username: string, password: string): Snoowrap {
  const snoowrap = new Snoowrap({
    userAgent: "",
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    username: username,
    password: password,
  });

  return snoowrap;
}

export function authRequester(): Snoowrap | null {
  const username = process.env.REACT_APP_FIRST_USERNAME;
  const password = process.env.REACT_APP_FIRST_PASSWORD;

  if (username && password) {
    const snoowrap = buildRequester(username, password);
    console.log("Logged in successfully");
    return snoowrap;
  } else {
    console.log("Unable to login");
    return null;
  }
}
