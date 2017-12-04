var express = require('express');
var app = express();
var http = require('http').Server(app);
var pug = require('pug');
var path = require('path');
var io = require('socket.io')(http);

var dbUtils = require('./database/utils');
var bot = require('./bot/bot');

app.engine('pug', require('pug').__express)
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT || 5000));
app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.get('/', function (req, res) {
	dbUtils.getUsers(result=>{
		res.render('index', { title: 'Telebot admin panel', database:result});
	});
});

app.get("/user/:id", function (req, res) {
	dbUtils.getMsg(req.params["id"], (usrs, msgs)=>{
			res.render('messages', { title: 'Telebot admin panel', id:req.params["id"], database:usrs, msgs:msgs});
		});
});

app.post('/send', (req, res)=>{
	console.log("Sended text is | "+req.params.text);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('reply msg', args=>{
	  console.log(args.usr + ' | '+ args.text)
	  bot.reply(args.usr, args.text);
  })
});


http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
