const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const articleCatSchema = new mongoose.Schema({
  name_fa: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  }
});

articleCatSchema.plugin(timestamp);
const ArticleCat = mongoose.model("ArticleCat", articleCatSchema);
module.exports = ArticleCat;