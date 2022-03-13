var crud = require("../../utility/crud");
var md5 = require("md5");
var crypto = require("crypto");
const model1 = require("../../models/Adminuser");

/**
 *
 * @param {*} req
 * @param {*} resnpm 
 */
const register = (req, res) => {
  var errMessage = "Failed to create admin user";
  var successMessage = "Admin user created.";

  var token = crypto.randomBytes(64);

  var userData = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
    authorizeToken: token.toString("hex"),
  };
  crud.createOperation(
    model1,
    userData,
    res,
    (isRegister = true),
    errMessage,
    successMessage
  );
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const login = (req, res) => {
  var errMessage = "Failed to login";
  var successMessage = "Login successfully";

  var userData = {
    email: req.body.email,
    password: md5(req.body.password),
    userStatus: 1,
  };

  crud.AdminLoginOperation(
    model1,
    userData,
    res,
    errMessage,
    successMessage
  );
};

module.exports = {
  register,
  login
};
