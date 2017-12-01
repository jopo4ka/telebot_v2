var app = require('express')();
var bot = require('./bot/bot');

app.get('/', (req, res)=>{
    var bot = require('./bot/bot');
    res.send('<H3>HELLO WORLD</H3>');
});
app.listen(3000, ()=>{
    console.log('app listening port 3000');
});