var express = require('express');
var mathjs = require('mathjs');
var app = express();


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

app.post('/', function (req, res) {
    var body = "";
    req.on("data", function (data) {
        body += data
    });
    req.on("end", function () {
            var expResult = mathjs.eval(body);
            res.send(expResult.toString());
        }
    );
});

app.listen(80);
console.log('Server running at port 80');