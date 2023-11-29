let path = require("path");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main_three.js",
        path: path.resolve(__dirname, "JS"),
    }
}