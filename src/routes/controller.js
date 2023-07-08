const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const User = require("./../models/user");
const Article = require("./../models/article");
const ArticleCat = require('./../models/articleCat')

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Article = Article;
    this.ArticleCat = ArticleCat;
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const massage = [];
      errors.forEach((err) => massage.push(err.msg));
      res.status(400).json({
        massage: "validation error",
        data: massage,
      });
      return false;
    }
    return true;
  }
  validate(req, res, next) {
    if (!this.validationBody(req, res)) return;
    next();
  }
  response({ res, massage, code = 200, data = {} }) {
    res.status(code).json({
      massage,
      data,
    });
  }
};
