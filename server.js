var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request'),
	http = require('http'),
	app = express();

app
	.use(express.static(__dirname + '/public/'))
	.use(bodyParser.urlencoded({extended : false}))
	.use(bodyParser.json())
	.get('/',function(req, res){
		res.sendFile('index.html');
	})
	.post('/', function(req, res){
		var options = {
			url : 'https://api.github.com/users/' + req.body.username ,
			headers : {
				'User-Agent' : 'request'
			}
		};

		request(options, function(err, resp, data){
			var jsonData = JSON.parse(data);
			res.send('<h1>' + jsonData.login + '</h1>' + ' <br><img width="80px" height="80px" src="' + jsonData.avatar_url + '">');
		});
	})
	.listen(3000);

console.log("Server is listening");
