const JWT = require("jsonwebtoken");
const user = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const findUser = await user.findOne({ where: { email: req.body.email } });
    if (findUser) {
      res.status(403).json({
        message: "user adready exist",
      });
      return;
    }
    const User = await user.create(req.body);

    const jwtData = {
      email: User.email,
    };
    const token = JWT.sign(
      jwtData,
      "ASLDKJFSKALJDKAJSLHasdkjlkjASDdsfglkjaklASDFAasdf"
    );

    res.status(200).cookie("token", token).json({
      message: "User created Sucessfully",
      User,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const User = await user.findOne({ where: { email: req.body.email } });
    if (!User) {
      res.status(401).json({
        message: "User with this email does not exist",
      });
    } else {
      if (User.password === req.body.password) {
        const jwtData = {
          email: User.email,
        };
        const token = JWT.sign(
          jwtData,
          "ASLDKJFSKALJDKAJSLHasdkjlkjASDdsfglkjaklASDFAasdf",
          {
            expiresIn: "5d",
          }
        );

        res.status(200).cookie("token", token).json({
          message: "login sucessfull",
        });
      } else {
        res.status(401).json({
          message: "Invalid User ID or Password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "loggedOUT").json({
      message: "logout sucessfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const User = await user.findOne({ where: { email: req.body.email } });
    if (!User) {
      res.status(401).json({
        message: "User with this email does not exist",
      });
    } else {
      if (req.body.newPassword !== req.body.confirmPassword) {
        res.send({ message: "password does not match" });
        return;
      }
      User.password = req.body.newPassword;
      await User.save();
      res.status(200).json({
        message: "password updated sucessfylly",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};
