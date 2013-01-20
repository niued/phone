var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleTagSchema = new Schema({
    Article_id: { type: ObjectId },
    Tag_id: { type: ObjectId }
});

mongoose.model('ArticleTag', ArticleTagSchema);
