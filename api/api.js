var fetch = require('./fetchUrl');
var jsonfile = require('jsonfile');

module.exports = {
	hello: function (req, res){
		console.log("hello");
	},
	getTors: function(req, res) {
		console.log("query : ",req.params.deviceName);
	},
	getDeviceName: function(req, res){
		var file = './output/usdl03-cnd-tor-2-e50-pps.json';
		// fetch.getJSON(req.params.url)
	},
	torName: function(req, res) {
		var file = './output/' + req.params.torName + '-' + req.params.ePort + '-pps.json';
		console.log(file);
		res.send(jsonfile.readFileSync(file));
		// console.log(req.headers.host);
		// fetch.getJSON('http://' + req.headers.host + '/api/chart' + req.params.torName, function(err, docs){
		// 	var seriesData = JSON.parse(docs);
		// 	console.log("seriesData",seriesData);
		// });
	}
}