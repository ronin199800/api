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
      const page = parseInt(req.query.page) || 1;
      const limit = 12;
      const skip = (page - 1) * limit;
      const articleCategory = await this.ArticleCat.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
      const totalArticles = await this.ArticleCat.count();
      const totalPages = Math.ceil(totalArticles / limit);
      this.response({
        res,
        data: "all article categories",
        data: articleCategory,
        totalPages,
      });
    } catch (error) {
      console.error(error);
      this.response({
        res,
        message: "Error retrieving articles categories",
        error,
      });
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
    this.response({ res, message: "article find", data: article });
  }
  async deleteArticle(req, res) {
    try {
      const article = await this.Article.findByIdAndRemove(req.params.id);
      if (!article) {
        return this.response({ res, message: 'Article not found' });
      }
      this.response({ res, message: 'Article successfully deleted', data: article });
    } catch (error) {
      console.error(error);
      this.response({ res, message: 'Internal server error' }, 500);
    }
  }
  async deleteArticleCat(req, res) {
    try {
      const articleCat = await this.ArticleCat.findByIdAndRemove(req.params.id);
      if (!articleCat) {
        return this.response({ res, message: 'Article category not found' });
      }
      this.response({ res, message: 'Article category successfully deleted', data: articleCat });
    } catch (error) {
      console.error(error);
      this.response({ res, message: 'Internal server error' }, 500);
    }
  }
})();
