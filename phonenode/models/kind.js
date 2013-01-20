var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var KindSchema = new Schema({
  name: { type: String },
  desc: { type: String },
  nav:{type:String}, //所属哪个模块
  order: { type: Number, default: 1 }
});

mongoose.model('Kind', KindSchema);
