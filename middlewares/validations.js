const {body, validationResult} = require("express-validator");
const {logger} = require("../logger");

const registrationValidator = async (req, res, next) => {
  try {
    const validationFunctions = {
      firstName: body("firstName")
        .isLength({max: 50})
        .matches(/^[a-zA-Z '.-]+$/)
        .withMessage("firstName is invalid"),
      lastName: body("lastName")
        .isLength({max: 50})
        .matches(/^[a-zA-Z '.-]+$/)
        .withMessage("lastName is invalid"),
      email: body("email")
        .isLength({max: 100})
        .isEmail()
        .withMessage("email is invalid"),
      password: body("password")
        .isStrongPassword({minLength: 5})
        .withMessage(
          "Password must be at least 5 characters long, must contain at least one lower case letter, one upper case letter, one digit and one special character."
        )
    };

    for (const field in validationFunctions) {
      if (
        (await body(field)
          .exists()
          .notEmpty()
          .run(req)).errors.length
      ) {
        return res.status(400).json({message: `${field} is required.`});
      }

      if ((await validationFunctions[field].run(req)).errors.length) break;
    }

    const errors = validationResult(req).array();
    if (errors.length) {
      return res.status(400).json({message: errors[0].msg});
    }

    // If no errors, proceed to the next middleware
    next();
  } catch (error) {
    logger.error("Middleware - registrationValidator - ", error);
    return res.status(500).json({message: "Internal server error"});
  }
};

const signinValidator = async (req, res, next) => {
  try {
    const validationFunctions = {
      email: body("email")
        .isLength({max: 100})
        .isEmail()
        .withMessage("email is invalid"),
      password: body("password")
        .isStrongPassword({minLength: 5})
        .withMessage(
          "Password must be at least 5 characters long, must contain at least one lower case letter, one upper case letter, one digit and one special character."
        )
    };

    for (const field in validationFunctions) {
      if (
        (await body(field)
          .exists()
          .notEmpty()
          .run(req)).errors.length
      ) {
        return res.status(400).json({message: `${field} is required.`});
      }

      if ((await validationFunctions[field].run(req)).errors.length) break;
    }

    const errors = validationResult(req).array();
    if (errors.length) {
      return res.status(400).json({message: errors[0].msg});
    }

    // If no errors, proceed to the next middleware
    next();
  } catch (error) {
    logger.error("Middleware - signinValidator - ", error);
    return res.status(500).json({message: "Internal server error"});
  }
};

// TODO: Add other validation functions

module.exports = {
  registrationValidator,
  signinValidator
};
