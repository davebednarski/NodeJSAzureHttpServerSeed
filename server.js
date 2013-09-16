var static = require('node-static');
var http = require('http');
//var util = require('util');

var port = process.env.PORT || 1337;
var file = new static.Server('./public', { 
  //cache: 600, 
  headers: { 'X-Powered-By': 'HELLO' },
  gzip: true
});

http.createServer(function (request, response) {
	request.addListener('end', function () {

		file.serve(request, response, function (err, result) {
			
			if (err && (err.status === 404 || err.status === 500)) { // If the file wasn't found
				console.error('Error status: '+ err.status);
                file.serveFile('/404.html', 404, {}, request, response);
            }
		});
	}).resume();
}).listen(port);