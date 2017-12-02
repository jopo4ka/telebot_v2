var app = require('express')();
var bot = require('./bot/bot');

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res)=>{
    var bot = require('./bot/bot');
    res.send('<H3>HELLO WORLD</H3>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});