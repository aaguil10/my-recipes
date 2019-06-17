class Utils {
  static getApiUrl() {
    if (process.env.NODE_ENV === "development") {
      return process.env.REACT_APP_DEV_API_URL;
    } else {
      return process.env.REACT_APP_PROD_API_URL;
    }
  }
}

export default Utils;
