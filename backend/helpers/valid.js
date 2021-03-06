//valiodation helpers

const { check } = require("express-validator");

//register
exports.validRegister = [
  check("name", "Name is required")
    .notEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Passwords must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("pasword must contain a number"),
];

//Login
exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Passwords must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("pasword must contain a number"),
];

//forgot password
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

//Reset password
exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Psassword must be atleast 6 characters long")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];
