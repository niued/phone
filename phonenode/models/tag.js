var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var TagSchema = new Schema({
  name: { type: String },
  description: { type: String },
  order: { type: Number, default: 1 }
});

mongoose.model('Tag', TagSchema);
