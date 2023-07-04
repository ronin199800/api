const winston = require("winston");
module.exports = (err, req, res, next) => {
    winston.error(err.massage,err)
  res.status(500).json({ massage: "(server error) - something faild" });
};
