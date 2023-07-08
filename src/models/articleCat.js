const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const articleCatSchema = new mongoose.Schema({
  name_fa: String,
  name_en:String

});
articleCatSchema.plugin(timestamp)
const ArticleCat = mongoose.model("ArticleCat", articleCatSchema);
module.exports = ArticleCat