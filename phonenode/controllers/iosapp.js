
var models = require('../models');
var IosApp = models.IosApp;

exports.index = function (req, res, next) {
    var page = req.params.page;
    var limit = 100;

    var opt = { skip: (page - 1) * limit, limit: limit, sort: [['sorttype', 'asc']] };
    get_iosapps_by_query({}, opt, function (err, iosapps) {
        res.render('admin/app/index', { apps: iosapps});
    });
}

//通过ID查找某个应用
function get_iosapp_by_id(id, cb) {
    IosApp.findOne({ _id: id }, function (err, iosapp) {
        if (err) return cb(err, null);
        return cb(err, iosapp);
    });
}


//通过条件，配置查找应用
function get_iosapps_by_query(query, opt, cb) {
    IosApp.find(query, null, opt, function (err, iosapps) {
        if (err) return cb(err);
        return cb(err, iosapps);
    });
}
