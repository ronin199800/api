const express = require("express");
const router = express.Router();
const controller = require("./controller");


router.post(
  "/",
  controller.postArticle
);
router.get(
  "/",
  controller.getArticle
);
router.get(
  "/category",
  controller.getArticleCategory
);
router.post(
  "/category",
  controller.postArticleCategory
);
router.get(
  "/:categoryId",
  controller.getByCategory
);



module.exports = router;
