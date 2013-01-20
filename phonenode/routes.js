/**
* @author djqq
*/
var kind = require('./controllers/kind.js');
var article = require('./controllers/article.js');
var upload = require('./controllers/upload.js');
exports = module.exports = function (app) {
    app.get('/admin/kind', kind.index);
    app.get('/admin/kind/edit', kind.edit);
    app.get('/admin/kind/edit-:id', kind.edit);
    app.post('/admin/kind/op', kind.op);

    app.get('/admin/article', article.index);
    app.get('/admin/article-:page', article.index);
    app.get('/admin/article/edit', article.edit);
    app.get('/admin/article/edit-:id', article.edit);
    app.post('/admin/article/op', article.op);
    
    app.post('/admin/upload',upload.image);
    app.get('/admin/upload/upload',upload.upload);
    app.post('/admin/upload/mulimage',upload.mulimage);
    
}

