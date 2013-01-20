/**
全站通用类
*/

var kind = require('../controllers/kind.js');

exports.replaceAll = function(achar,charA,charB){
	var rep = new RegExp(charA,"g");
    return achar.replace(rep,charB);
}
