var models = require('../models');
var Tag = models.Tag;
var Article = models.Article;
var ArticleTag = models.ArticleTag;
var Kind = models.Kind;
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var EventProxy = require('eventproxy').EventProxy;

exports.index = function (req, res, next) {
    var opt = { sort: [['nav', 'desc'], ['order', 'desc']] };
    get_kinds_by_query({}, opt, function (err, kinds) {
        res.render('admin/kind/index', { kinds: kinds });
    });
}

exports.edit = function (req, res, next) {
    var kid = req.params.id;
    if (kid) {
        get_kind_by_id(kid, function (err, kind) {
            if (err) return next(err);
            res.render('admin/kind/edit', {
                kind: kind,
                type: "edit"
            });
        });
    } else {
        var kind = new Kind();
        res.render('admin/kind/edit', {
            kind: kind,
            type: "add"
        });
    }
}

exports.op = function (req, res, next) {
    var kid = req.body.id;
    if (kid) {
        get_kind_by_id(kid, function (err, kind) {
            if (err) return next(err);
            if (kind) {
                kind.name = req.body.name;
                kind.desc = req.body.desc;
                kind.nav = req.body.nav;
                kind.order = req.body.order;
                kind.save(function (err) {
                    res.redirect("/admin/kind");
                })
            }
        });
    } else {
        var kind = new Kind();
        kind.name = req.body.name;
        kind.desc = req.body.desc;
        kind.nav = req.body.nav;
        kind.order = req.body.order;
        kind.save(function (err) {
            res.redirect("/admin/kind");
        })
    }
}


//通过条件，配置查找分类
function get_kinds_by_query(query, opt, cb) {
    Kind.find(query, null, opt, function (err, kinds) {
        if (err) return cb(err);
        return cb(err, kinds);
    });
}

//通过ID查找某个分类
function get_kind_by_id(id, cb) {
    Kind.findOne({ _id: id }, function (err, kind) {
        if (err) return cb(err, null);
        return cb(err, kind);
    });
}


//通过ID S查找某个分类
function get_kind_by_ids(ids, cb) {
    Kind.findOne({ _id: { '$in': ids} }, function (err, kinds) {
        if (err) return cb(err, null);
        return cb(err, kinds);
    });
}

exports.get_kinds_by_query = get_kinds_by_query;
exports.get_kind_by_ids = get_kind_by_ids;


