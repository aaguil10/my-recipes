import axios from "axios";
import Utils from "./Utils";

const RECIPE_LIST = "recipe_list";
const GET_RECIPES_URL = Utils.getApiUrl() + "/recipe/getrecipes";
const INSERT_RECIPE_URL = Utils.getApiUrl() + "/recipe/insert";

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
    const user_id = localStorage.getItem("user_id");
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
}

export default DataHandler;
