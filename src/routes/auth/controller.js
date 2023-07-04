const controller = require("../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        massage: "user is alredy existed",
        code: 400,
      });
    }
    user = new this.User(_.pick(req.body, ["email", "name", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    this.response({
      res,
      massage: "the user successfuly registerd",
      code: 200,
      data: _.pick(user, ["email", "name", "id"]),
    });
  }
  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        massage: "invalid password or email",
        code: 400,
      });
    }
    const isValid = bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        massage: "invalid password or email",
        code: 400,
      });
    }
    const token = jwt.sign({ _id: user.id },config.get("jwt_key"));
    this.response({
      res,
      massage:'succsessfuly log in',
      data:{token}
    })
  }
})();
