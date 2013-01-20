var fs = require('fs');
var path = require('path');
var easyimg = require('easyimage');

var upload_path = path.join(path.dirname(__dirname), 'static/upload');

exports.image = function(req, res, next) {
	var host = req.headers.host;
	var file = req.files.imgFile;
	// sould use async
	if (file) {
		var name = file.name;
		var ext = name.substr(name.lastIndexOf('.'),4);
		var time = new Date().getTime();
		
		var new_name = time + ext;
		var new_path = path.join(upload_path, new_name);
		fs.rename(file.path, new_path, function(err) {
			if (err) {
				return next(err);
			}
			var url = 'http://' + host + '/upload/' + new_name;
			res.json({ error: 0, url: url });
		});
	}else{
		res.json({ error: 1, message: "出错了!" });
	}

};

exports.mulimage = function(req, res, next) {
	var host = req.headers.host;
	var file = req.files.imgFile;
	// sould use async
	if (file) {
		var name = file.name;
		var ext = name.substr(name.lastIndexOf('.'),4);
		var time = new Date().getTime();
		
		var new_name = time + ext;
		var new_path = path.join(upload_path, new_name);
		var new_tpath = path.join(upload_path+"/240", new_name);
		fs.rename(file.path, new_path, function(err) {
			if (err) {
				return next(err);
			}
			console.log(1);
			easyimg.thumbnail(
			  {
			     src:new_path, dst:new_tpath,
			     	width:720, height:270,
					x:0, y:0
			     },
			  function(err, image) {
			     if (err) throw err;
			     console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
			  }
			);
			
			var url = 'http://' + host + '/upload/' + new_name;
			
			res.render("admin/article/upload.htm",{
				layout:false,
				imgurl:url
			})
			
			
		});
	}else{
		res.render("admin/article/upload.htm",{
			layout:false,
			imgurl:""
		})
	}

};



exports.upload = function(req,res,next){
	res.render("admin/article/upload.htm",{
		layout:false,
		imgurl:""
	})
}