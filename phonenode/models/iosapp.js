var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var IosAppSchema = new Schema({
    appid: { type: String },
    name: { type: String },
    summary: { type: String },
    link: { type: String },
    category: { type: String },
    artist: { type: String },
    price: { type: String },
    img: { type: String },
    releasedate: { type: String },
    sort: { type: Number,default:0 },
    sorttype: { type: Number,default:0}
});

mongoose.model('IosApp', IosAppSchema);