var express = require('express');
var app = express();

app.use(express.static('html'));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(3000, function () {
  console.log('Photo app listening on port 3000!');
});