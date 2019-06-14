import auth0 from "auth0-js";
import axios from "axios";

const ACCESS_TOKEN = "access_token";
const ID_TOKEN = "id_token";
const SCOPE = "scope";
const EXPIRES_AT = "expires_at";
const USER_ID = "user_id";
const GET_USER_URL =
  "https://us-central1-myrecipes-f34ca.cloudfunctions.net/users/getUser";

let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "grubnote.auth0.com",
    clientID: "1usBkm70LnyBCx8qrXcgbH7EMFP9dwak",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  login() {
    this.auth0.authorize();
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(SCOPE);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(USER_ID);

    let auth = new auth0.WebAuth({
      domain: "grubnote.auth0.com",
      clientID: "1usBkm70LnyBCx8qrXcgbH7EMFP9dwak",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile email"
    });
    auth.logout({
      clientID: "1usBkm70LnyBCx8qrXcgbH7EMFP9dwak",
      returnTo: "http://localhost:3000"
    });
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        //return "/";
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    console.log(authResult);
    // set the time that the access token will expire
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    _scopes = authResult.scope || this.requestedScopes || "";

    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;

    localStorage.setItem(EXPIRES_AT, JSON.stringify(_expiresAt));
    localStorage.setItem(SCOPE, JSON.stringify(_scopes));
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(_accessToken));
    localStorage.setItem(ID_TOKEN, JSON.stringify(_idToken));

    this.getUser(authResult.idTokenPayload);
    this.scheduleTokenRenewal();
  };

  getUser(idTokenPayload) {
    console.log("***idTokenPayload***");
    console.log(idTokenPayload);
    axios
      .post(GET_USER_URL, idTokenPayload)
      .then(function(response) {
        console.log("***response***");
        console.log(response);
        localStorage.setItem(USER_ID, response.data.id);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }

  isAuthenticated() {
    _expiresAt = localStorage.getItem(EXPIRES_AT);
    return new Date().getTime() < _expiresAt;
  }
}
