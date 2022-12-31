const app = require("./app");
const sequelize = require("./config/db");

app.listen(4000, (req, res) => {
  console.log("server running on port 4000");
});
