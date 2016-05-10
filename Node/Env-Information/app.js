var express = require("express");
var app = express();
var http = require("http");
var https = require("https");
var ipAddresses = "192.168.31.183";



function getBuildInfo(ipAddress) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
    var buildDetails = "";
    var options = {
        host: ipAddress,
        port: 5004,
        path: '/AppViewXNGWeb/buildInfo',
        method: 'GET'
    };

    var req = https.request(options, function(res) {
    	//console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            chunk = chunk.split("!-------- AppViewX Build Information --------!").join("").split("\n\n").join("\n");
            buildDetails += chunk;
            console.log('' + chunk);
            console.log(typeof chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();
    console.log(buildDetails + "SDfdsfsdsdfdsfs");
    return buildDetails;
}

app.get("/", function(req, res) {
    console.log("This is the response sent to the request");
    var a = getBuildInfo(ipAddresses);
    console.log(a);
    res.end("Response document");
});
app.listen(3000);
