import auth0 from "auth0-js";
import axios from "axios";
import Utils from "../Utils";
import DataHandler from "../DataHandler";

const ACCESS_TOKEN = "access_token";
const ID_TOKEN = "id_token";
const SCOPE = "scope";
const EXPIRES_AT = "expires_at";
const USER_ID = "user_id";
const GET_USER_URL = Utils.getApiUrl() + "/users/getUser";

let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;

class Auth {
  auth0 = Auth.getAuth0();

  login() {
    this.auth0.authorize();
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(SCOPE);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(USER_ID);
    DataHandler.cleanLocalStorage();

    let auth = Auth.getAuth0();
    if (process.env.NODE_ENV === "development") {
      auth.logout({
        clientID: process.env.REACT_APP_DEV_AUTH0_CLIENT_ID,
        returnTo: process.env.REACT_APP_DEV_AUTH0_LOGOUT_URL
      });
    } else {
      auth.logout({
        clientID: process.env.REACT_APP_PROD_AUTH0_CLIENT_ID,
        returnTo: process.env.REACT_APP_PROD_AUTH0_LOGOUT_URL
      });
    }
  }

  handleAuthentication = callback => {
    this.auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        await this.setSession(authResult);
        if (callback) {
          callback("/");
        }
      } else if (err) {
        console.log(err);
        if (callback) {
          callback("/Error");
        }
      }
    });
  };

  setSession = async authResult => {
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    _scopes = authResult.scope || this.requestedScopes || "";
    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;

    localStorage.setItem(EXPIRES_AT, JSON.stringify(_expiresAt));
    localStorage.setItem(SCOPE, JSON.stringify(_scopes));
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(_accessToken));
    localStorage.setItem(ID_TOKEN, JSON.stringify(_idToken));

    this.scheduleTokenRenewal();
    const result = await this.getUser(authResult.idTokenPayload);
    return result;
  };

  async getUser(idTokenPayload) {
    console.log("***idTokenPayload***");
    console.log(idTokenPayload);
    const response = await axios.post(GET_USER_URL, idTokenPayload);
    console.log("***response***");
    console.log(response);
    localStorage.setItem(USER_ID, response.data.id);
    return response;
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }

  isAuthenticated() {
    _expiresAt = localStorage.getItem(EXPIRES_AT);
    return new Date().getTime() < _expiresAt;
  }

  static getAuth0() {
    let responseType = "token id_token";
    let scope = "openid profile email";
    let _auth0;
    if (process.env.NODE_ENV === "development") {
      _auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_DEV_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_DEV_AUTH0_CLIENT_ID,
        redirectUri: process.env.REACT_APP_DEV_AUTH0_CALLBACK_URL,
        responseType: responseType,
        scope: scope
      });
    } else {
      _auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_PROD_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_PROD_AUTH0_CLIENT_ID,
        redirectUri: process.env.REACT_APP_PROD_AUTH0_CALLBACK_URL,
        responseType: responseType,
        scope: scope
      });
    }
    return _auth0;
  }
}

export default Auth;
