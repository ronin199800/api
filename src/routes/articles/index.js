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
  controller.getcategory
);
router.get(
  "/:category",
  controller.getBycategory
);



module.exports = router;
