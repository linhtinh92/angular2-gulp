var express = require('express');

var app = express();
var mainPath = __dirname;
app.use(express.static(__dirname));
var port = 6060;
//Serve CSS
app.get('/css/*', function (req, res) {
    console.log('Req.url', req.url);
    app.render(mainPath + req.url);
});
//Serve JS
app.get('/public/lib/js/*', function (req, res) {
    console.log('JS file Req.url', req.url);
    app.render(mainPath+ req.url);
});
app.get('/public/dist/js/*', function (req, res) {
    console.log('JS file Req.url', req.url);
    app.render(mainPath+ req.url);
});
app.get('/html/*', function (req, res) {
    console.log('JS file Req.url', req.url);
    app.render(mainPath+ req.url);
});
app.get('*', function (req, res) {
    res.sendfile(mainPath+'/index.html')
});
app.listen(port,function() {
	console.log("server runing port "+port);
});