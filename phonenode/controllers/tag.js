var models = require('../models');
var Tag = models.Tag;
var Article = models.Article;
var ArticleTag = models.ArticleTag;
var Kind = models.Kind;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy').EventProxy;


//通过条件，配置查找标签
function get_tags_by_query(query, opt, cb) {
    Tag.find(query, null, opt, function (err, tags) {
        if (err) return cb(err);
        return cb(err, tags);
    });
}

//通过ID查找某个标签
function get_tag_by_id(id, cb) {
    Tag.findOne({ _id: id }, function (err, tags) {
        if (err) return cb(err, null);
        return cb(err, tags);
    });
}

//添加标签
function add_tag(tag, cb) {
    tag.save(function (err, tag) {
        if (err) return cb(err, null);
        return cb(err, tag);
    });
}

