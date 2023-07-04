const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async postArticle(req, res) {
    const article = await new this.Article(
      _.pick(req.body, ["name", "content", "read_time", "img_url", "category"])
    );
    await article.save();
    this.response({
      res,
      massage: "article succsesfully created",
      data: _.pick(article, [
        "name",
        "content",
        "read_time",
        "img_url",
        "_id",
        "updatedAt",
        "category",
      ]),
    });
  }
  async getArticle(req, res) {
    const article = await this.Article.find().sort({ createdAt: -1 });
    this.response({ res, massage: "all articles", data: article });
  }
  async getcategory(req, res) {
    try {
      const categories = await this.Article.distinct("category");
      this.response({ res, data: categories });
    } catch (error) {
      console.error(error);
    }
  }
  async getBycategory(req, res) {
    try {
      const article = await this.Article.find({
        category: req.params.category,
      }).sort({ createdAt: -1 });
      this.response({ res, data: article });
    } catch (error) {
      console.error(error);
    }
  }
})();
