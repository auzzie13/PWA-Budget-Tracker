const config = {
  entry: {
    app: "./public/src/app.js"
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js"
  },
  mode: "development",
};

module.exports = config;