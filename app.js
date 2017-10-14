var express = require("express")
var CodeBreaker = require("./CodeBreaker")
var code = new CodeBreaker();

var app = express()
app.set('port', (process.env.PORT || 3000));

app.get('/setSecret/:secret', function (req, res) {
  number = req.params.secret;
  code.setRandNumber(number);
  res.send({message: 'Lets rock this game'})
})
app.get('/guess/:secret', function (req, res) {
  number = req.params.secret;
  res.send({result: code.tryCode(number)})
})

app.listen(app.get('port'), function(){
  console.log("App running");
})

module.exports = app;
