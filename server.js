/* Module Dependencies */
var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	app = express(),
	colors = require('colors'),
	open = require('open');

/* port */
var port = process.env.PORT || 9999;

/* view engine */
app.set("views", path.join(__dirname, "/public"));
app.set("view_engine", "html").engine("html", function(path, options, fn) {
    if ("function" === typeof options) {
        fn = options;
        options = {};
    }
    return fs.readFile(path, "utf8", fn);
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/* Routes */
app.get('/', function(req, res) {
	res.render('index.html');
});
app.get('/chart/:torname/:eport', function(req, res) {
	res.render('chart.html');
});
app.get('/404',function(req,res){
    res.sendStatus(404);
});

/* Data for chart */
var Api = require('./api/api');
app.get('/api/chart/:torName/:ePort', Api.torName);

/* express server */
app.listen(port, function(req, res) {
	console.log(("Common API listening on port : " + port).green);
})