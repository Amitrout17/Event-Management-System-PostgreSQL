const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token || token === "loggedOUT") {
      return res.status(401).json({
        message: "please login first",
      });
    } else {
      const decodedData = jwt.verify(
        token,
        "ASLDKJFSKALJDKAJSLHasdkjlkjASDdsfglkjaklASDFAasdf"
      );

      console.log(decodedData)

      req.user = await user
        .findOne({ where: { email: decodedData.email } })
        .catch((error) => {
          res.status(500).json({
            message: "Middleware Error",
            error_message: error.message,
          });
        });
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error,
    });
  }
};

module.exports = isAuthenticated;