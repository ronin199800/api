const expressValidator = require("express-validator");
const check = expressValidator.check;
module.exports = new (class {
  postCategoryValidator() {
    return [
      check("name_fa").not().isEmpty().withMessage("name_fa cannot be empty"),
      check("name_en").not().isEmpty().withMessage("name_en cannot be empty"),
    ];
  }
})();
