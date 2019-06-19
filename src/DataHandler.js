import axios from "axios";
import Utils from "./Utils";

const RECIPE_LIST = "recipe_list";
const GET_RECIPES_URL = Utils.getApiUrl() + "/recipe/getrecipes";

class DataHandler {
  static getRecipeList(callback) {
    let data = JSON.parse(localStorage.getItem(RECIPE_LIST));
    if (data !== undefined && data !== null) {
      return data;
    } else {
      const user_id = localStorage.getItem("user_id");
      const access_token = localStorage.getItem("access_token");
      var config = {
        headers: {
          Authorization: "Bearer " + access_token
        }
      };
      axios
        .post(
          GET_RECIPES_URL,
          {
            user_id: user_id
          },
          config
        )
        .then(({ data }) => {
          localStorage.setItem(RECIPE_LIST, JSON.stringify(data));
          if (callback) {
            callback(data);
          }
        });
      return [];
    }
  }

  static cleanLocalStorage() {
    localStorage.removeItem(RECIPE_LIST);
  }
}

export default DataHandler;
