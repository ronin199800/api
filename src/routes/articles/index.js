const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.post("/", controller.postArticle);
router.get("/", controller.getArticle);
router.delete("/:id", controller.deleteArticle);
router.get("/category", controller.getArticleCategory);
router.get("/:id", controller.getEachArticle);
router.post(
  "/category",
  validator.postCategoryValidator(),
  controller.validate,
  controller.postArticleCategory
);
router.delete("/category/:id", controller.deleteArticleCat);

module.exports = router;
