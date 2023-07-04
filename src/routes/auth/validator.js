const expressValidator = require("express-validator");
const check = expressValidator.check;
module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("email must be valid"),
      check("name").not().isEmpty().withMessage("name cannot be empty"),
      check("password").not().isEmpty().withMessage("password cannot be empty"),
    ];
  }
  loginValidaitor() {
    return [
      check("email").isEmail().withMessage("email must be valid"),
      check("password").not().isEmpty().withMessage("password cannot be empty"),
    ];
  }
})();
