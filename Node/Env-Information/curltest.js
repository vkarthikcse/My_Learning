var http = require("http");

function getBuildInfo(ipAddress, httpsc) {

	var options = {
		host: ipAddress,
		port: 5004,
		path: '/AppViewXNGWeb/buildInfo',
		method: 'GET'
	};

	var req = http.request(options, function(res) {
		//console.log('STATUS: ' + res.statusCode);
		//console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			chunk = chunk.split("!-------- AppViewX Build Information --------!").join("").split("\n\n").join("\n");
			console.log('' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();

}

var fs  = require("fs");
var ipAddresses = fs.readFileSync("ipAddresses.txt").toString().split('\n');

var ipList = ipAddresses;
var i = 0;
	
var int1 = setInterval(function(){
	var ipAddress = ipList[i++].trim();
	console.log("\n=================================\n" + ipAddress + "\n=================================");

	getBuildInfo(ipAddress);
	if(i >= ipList.length) {
		clearInterval(int1);
	}
}, 2000);