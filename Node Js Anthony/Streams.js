var express = require("express");
var app = express();

var port = process.env.PORT || 3110;

app.use("/assets",express.static(__dirname + "/Public"));

app.use("/",function(req, res, next){
    console.log("Request Url: " + req.url);
    next();
})
app.get("/",function(req, res){
        res.send("<html><head><link href=/assets/Style.css type=text/css rel=stylesheet /> </head><body><h1>Hello World!!!</h1></body></html>");
    
});
app.get("/api",function(req, res){
    res.json({ "name":"Karthik Vadivel",
    
    "college" : "Karpagam College of Engineering"
    });
})
app.listen(port); 