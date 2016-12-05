module.exports = {
	getJSON: function(req, res) {
		console.log(res);
		function getUrlData(res) {
      		var xhr = new XMLHttpRequest();
          	xhr.open("GET", res, false);
          	xhr.send(null);
          	return xhr.responseText;
      	}
	}
}