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
    try {
      console.log(req.query);
      const page = parseInt(req.query.page) || 1;
      const limit = 12;
      const skip = (page - 1) * limit;
  
      let query = {};
  
      if (req.query.category) {
        query.category = req.query.category;
      }
  
      const articles = await this.Article.find(query)
        .populate("category", ["name_fa", "name_en", "_id"])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
  
      const totalArticles = await this.Article.count(query);
      const totalPages = Math.ceil(totalArticles / limit);
  
      this.response({
        res,
        message: "articles by category",
        data: articles,
        totalPages,
      });
    } catch (error) {
      console.error(error);
      this.response({ res, message: "Error retrieving articles", error });
    }
  }

  async getArticleCategory(req, res) {
    try {
      const articleCategory = await this.ArticleCat.find();
      this.response({
        res,
        data: "all article categories",
        data: articleCategory,
      });
    } catch (error) {
      console.error(error);
      this.response({ res, message: "Error retrieving articles", error });
    }
  }

  async postArticleCategory(req, res) {
    const articleCat = await new this.ArticleCat(
      _.pick(req.body, ["name_fa", "name_en"])
    );
    await articleCat.save();
    this.response({
      res,
      massage: "article category succsesfully created",
      data: _.pick(articleCat, ["name_fa", "name_en", "createdAt"]),
    });
  }
  async getEachArticle(req, res) {
    const article = await this.Article.findById(req.params.id);
    this.response({ res, massage: "article find", data: article });
  }
})();
