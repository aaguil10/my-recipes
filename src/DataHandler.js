import axios from "axios";
import Utils from "./Utils";

const RECIPE_LIST = "recipe_list";
const PROFILE = "profile";

const GET_RECIPES_URL = Utils.getApiUrl() + "/recipe/getrecipes";
const INSERT_RECIPE_URL = Utils.getApiUrl() + "/recipe/insert";
const GET_USER_URL = Utils.getApiUrl() + "/users/getUser";

function getConfig() {
  const access_token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: "Bearer " + access_token
    }
  };
  return config;
}

class DataHandler {
  static insertRecipe(recipe, callback) {
    axios
      .post(INSERT_RECIPE_URL, recipe, getConfig())
      .then(function(response) {
        if (callback != null) {
          callback(response);
        }
      })
      .catch(function(error) {
        console.log(error);
        if (callback != null) {
          callback(error);
        }
      });
  }

  static getRecipeList(callback) {
    const user_id = this.getUserID();
    axios
      .post(
        GET_RECIPES_URL,
        {
          user_id: user_id
        },
        getConfig()
      )
      .then(({ data }) => {
        if (Array.isArray(data)) {
          localStorage.setItem(RECIPE_LIST, JSON.stringify(data));
        }
        if (callback) {
          callback(data);
        }
      });

    let data = JSON.parse(localStorage.getItem(RECIPE_LIST));
    if (data !== undefined && data !== null) {
      return data;
    } else {
      return [];
    }
  }

  static cleanLocalStorage() {
    localStorage.removeItem(RECIPE_LIST);
  }

  static async getUser(idTokenPayload) {
    console.log("***idTokenPayload***");
    console.log(idTokenPayload);
    const response = await axios.post(GET_USER_URL, idTokenPayload);
    console.log("***response***");
    console.log(response);
    localStorage.setItem(PROFILE, JSON.stringify(response.data));
    return response;
  }

  static getProfileURL() {
    const profile = JSON.parse(localStorage.getItem(PROFILE));
    return profile.picture;
  }

  static getUserID() {
    const profile = JSON.parse(localStorage.getItem(PROFILE));
    return profile.id;
  }

  static getUserFLName() {
    const profile = JSON.parse(localStorage.getItem(PROFILE));
    return profile.first_name + profile.last_name;
  }

  static getUserEmail() {
    const profile = JSON.parse(localStorage.getItem(PROFILE));
    return profile.email;
  }
}

export default DataHandler;
