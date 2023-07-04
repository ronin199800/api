const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./user copy");
const articleRouter =require('./articles')
const { isLoggined, isAdmin } = require("./../middlewares/auth");
const error = require("./../middlewares/error");

router.use("/auth", authRouter);
router.use("/user", isLoggined, userRouter);
router.use("/admin", isLoggined, isAdmin, adminRouter);
router.use('/article',articleRouter)



router.use(error)
module.exports = router;
