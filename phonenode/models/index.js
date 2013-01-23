var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./article');
require('./kind');
require('./iosapp');
require('./tag');
require('./article_tag');
exports.Article = mongoose.model('Article');
exports.Kind = mongoose.model('Kind');
exports.IosApp = mongoose.model('IosApp');
exports.Tag = mongoose.model('Tag');
exports.ArticleTag = mongoose.model('ArticleTag');