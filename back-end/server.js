const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
var unirest = require('unirest');

server.use(express.static(path.join(__dirname, 'public'))); //send public files to client
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.route('/*').get(function(req, res) {
// 	return res.sendFile(path.join(__dirname, 'public/index.html'));
// });

var filterResults = function(json) {

};

server.get('/crossfits', function(req, res) {
	return res.sendFile(path.join(__dirname, 'geojsons/crossFits.json'));
});
// get list of properties for sale
server.get('/zoopla', function(req, res) {
	var country = req.country;
	var reJson;
	unirest.get('http://api.zoopla.co.uk/api/v1/property_listings.js?api_key=24hmsrwtvhzeemqd7gfk3qam&country=England')
	.end(function(response) {
		reJson = response.body;
		console.log('got res');
		console.log(reJson);
		// sort through the reJson.listing array, compare to crossfit locations, return matching features
		var filteredJson = filterResults(reJson);
		res.setHeader('Content-Type', 'application/json');
		//res.status(200).json(reJson);
	});
});

server.listen(process.env.PORT || 3000);