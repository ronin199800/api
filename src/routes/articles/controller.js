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
      const articles = await this.Article.find()
        .populate("category", ["name_fa", "name_en"])
        .sort({ createdAt: -1 })
        .exec();

      this.response({ res, message: "All articles", data: articles });
    } catch (error) {
      console.error(error);
      this.response({ res, message: "Error retrieving articles", error });
    }
  }

  async getArticleCategory(req, res) {
    const articleCategory = await this.ArticleCat.find();
    this.response({
      res,
      data: "all article categories",
      data: articleCategory,
    });
  }
  async getByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      console.log(req.params.categoryId)
  
      const articles = await this.Article.find({ category: categoryId })
        .populate("category")
        .sort({ createdAt: -1 })
        .exec();
  
      this.response({ res, message: "Articles by category", data: articles });
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
  async getEachArticle (req,res){
    const article = await this.Article.findById(req.params.id)
    this.response({res,massage:'article find',data:article})
  }
})();
