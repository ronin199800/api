const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const articleSchema = new mongoose.Schema({
  name: String,
  content:String,
  read_time:Number,
  img_url:String,
  category: {
    type : mongoose.Schema.Types.ObjectId,
    ref:'ArticleCat'
  }
});
articleSchema.plugin(timestamp)
const Article = mongoose.model("Article", articleSchema);
module.exports = Article