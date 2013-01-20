var models = require('../models');
var Tag = models.Tag;
var Article = models.Article;
var ArticleTag = models.ArticleTag;
var Kind = models.Kind;
var EventProxy = require('eventproxy').EventProxy;
var config = require('../config').config;

var kind_ctrl = require('./kind');



exports.index = function (req, res, next) {
    var page = req.params.page;
    var limit = config.adminlimit;

    var opt = { skip: (page - 1) * limit, limit: limit, sort: [['top', 'desc'], ['createtime', 'desc']] };
    get_articles_by_query({}, opt, function (err, articles) {
        console.log(articles);
        var kinds_id = [];
        for (var i = 0; i < articles.length; i++) {
            kinds_id.push(articles[i].kind_id);
        }
        kind_ctrl.get_kind_by_ids(kinds_id, function (err, kinds) {
            var kinds_idDic = {};
            if (kinds) {
                for (var j = 0; j < kinds.length; j++) {
                    kinds_idDic[kinds[i]._id] = kinds[i];
                }
            }
            res.render('admin/article/index', { articles: articles, kindsDic: kinds_idDic });

        });
    });



}


exports.edit = function (req, res, next) {
    var aid = req.params.id;

    kind_ctrl.get_kinds_by_query({}, [], function (err, kinds) {
        var kinds_idDic = {};
        for (var j = 0; j < kinds.length; j++) {
            kinds_idDic[kinds[j]._id] = kinds[j];
        }
        if (aid) {
            get_article_by_id(aid, function (err, article) {
                if (err) return next(err);
                res.render('admin/article/edit', {
                    article: article,
                    kindsDic: kinds_idDic,
                    type: "edit"
                });
            });
        } else {
            var article = new Article();
            res.render('admin/article/edit', {
                article: article,
                kindsDic: kinds_idDic,
                type: "add"
            });
        }
    });
}


exports.op = function (req, res, next) {
    var aid = req.body.id;
    if (aid) {
        get_article_by_id(aid, function (err, article) {
            if (err) return next(err);
            if (article) {
                article.title = req.body.title;
                article.content = req.body.content;
                article.desc = req.body.desc;
                article.thumbimg = req.body.thumbimg;
                article.nav = req.body.nav;
                article.kind_id = req.body.kid;
                article.author = req.body.author;
                article.top = req.body.top == "1"? true:false;
                article.save(function (err) {
                    res.redirect("/admin/article");
                })
            }
        });
    } else {
        var article = new Article();
        article.title = req.body.title;
        article.content = req.body.content;
        article.desc = req.body.desc;
        article.thumbimg = req.body.thumbimg;
        article.nav = req.body.nav;
        article.kind_id = req.body.kid;
        article.author = req.body.author;
        article.top = req.body.top == "1"? true:false;
        article.save(function (err) {
            res.redirect("/admin/article");
        })
    }
}




//通过ID查找某个文章
function get_article_by_id(id, cb) {
    Article.findOne({ _id: id }, function (err, article) {
        if (err) return cb(err, null);
        return cb(err, article);
    });
}


//通过条件，配置查找文章
function get_articles_by_query(query, opt, cb) {
    Article.find(query, null, opt, function (err, articles) {
        if (err) return cb(err);
        return cb(err, articles);
    });
}
