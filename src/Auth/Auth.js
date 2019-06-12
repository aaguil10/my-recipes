import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "grubnote.auth0.com",
    clientID: "1usBkm70LnyBCx8qrXcgbH7EMFP9dwak",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult);
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };
}
