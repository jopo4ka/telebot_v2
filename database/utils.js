var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var models = require('./models');
// подключение
var uri = 'mongodb://127.0.0.1/test';

module.exports.addUser = function(msg){
	mongoose.connect(uri, (err)=>{
		if (err) throw err;
		var user = new models.user(
			{
			_id : msg.from.id,
			first_name: msg.from.first_name,
			last_name: msg.from.last_name
		});
		user.save((err)=> {
			mongoose.disconnect();
			if(err) return console.log(err);
			console.log("Сохранен объект user", user);
		});
	});
}

module.exports.updCity = function(msg){
	mongoose.connect(uri, (err, usr)=>{
		models.user.findById(msg.from.id, function (err, doc) {
			if (err) throw err;
			doc.city = msg.text;
			doc.save((err)=>{
				if (err) throw err;
				console.log('City is updated | new city: '+msg.text);
			});
		});
	})
}