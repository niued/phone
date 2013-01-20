var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
  
var ArticleSchema = new Schema({
  title: { type: String },
  content: { type: String,default:"" },
  desc:{type:String},
  thumbimg:{type:String},
  nav:{type:String},
  kind_id:{type:ObjectId},
  author:{type:String},
  createtime:{type: Date, default: Date.now},
  readcount:{type:Number,default:1},
  top:{type:Boolean,default:false}//是否置顶
});

mongoose.model('Article', ArticleSchema);