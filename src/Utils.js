class Utils {
  constructor() {
    Utils.metric = 5;
  }

  static getApiUrl() {
    if (process.env.NODE_ENV === "development") {
      return process.env.REACT_APP_DEV_API_URL;
    } else {
      return process.env.REACT_APP_PROD_API_URL;
    }
  }

  static getMetric(id) {
    return this.getUnits()[id - 1];
  }

  static getUnits() {
    return [
      { id: 1, unitOf: "mass", unit: "Grams", abbr: "g" },
      { id: 2, unitOf: "mass", unit: "Pound", abbr: "lbs" },
      { id: 3, unitOf: "mass", unit: "Ounce", abbr: "oz" },
      { id: 4, unitOf: "volume", unit: "Fluid Ounce", abbr: "fl. oz" },
      { id: 5, unitOf: "volume", unit: "Cups", abbr: "cups" },
      { id: 6, unitOf: "volume", unit: "Gallon", abbr: "gal" },
      { id: 7, unitOf: "volume", unit: "Tablespoon", abbr: "tbsp" },
      { id: 8, unitOf: "volume", unit: "Teaspoon", abbr: "tsp" },
      { id: 9, unitOf: "volume", unit: "Quart", abbr: "qt" },
      { id: 10, unitOf: "volume", unit: "Pint", abbr: "pt" },
      { id: 11, unitOf: "volume", unit: "Liter", abbr: "ltr" },
      { id: 12, unitOf: "volume", unit: "Milliliter", abbr: "ml" },
      { id: 13, unitOf: "mass", unit: "Kilogram", abbr: "kg" },
      { id: 14, unitOf: "mass", unit: "Milligram", abbr: "mg" }
    ];
  }

  static getUnit(unit_name) {
    const units = Utils.getUnits();
    for (let i in units) {
      const unit = units[i];
      if (unit.unit === unit_name || unit.abbr === unit_name) {
        return unit;
      }
    }
    return 0;
  }
}

export default Utils;
