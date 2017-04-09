const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const server = express();
var unirest = require('unirest');
const turfBuffer = require('@turf/buffer');
const turfWithin = require('@turf/within');

server.use(express.static(path.join(__dirname, 'public'))); //send public files to client
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// server.route('/*').get(function(req, res) {
// 	return res.sendFile(path.join(__dirname, 'public/index.html'));
// });

var crossFits;
fs.readFile('./geojsons/crossFits.json', 'utf8', function(err, data){
	if(err) throw err;
	crossFits = JSON.parse(data);
});

var filterResults = function(json) {
	console.log(crossFits.features.length); // make sure crossFits has loaded
	var points = {
		'type': 'FeatureCollection',
		'features': []
	};
	for(var i = 0; i < json.listing.length; i ++) {
		var listing = json.listing[i];
		var feature = {
			'type' : 'Feature',
			'properties': {
				'street_name': listing.street_name,
				'image_url': listing.image_80_60_url,
				'url' : listing.details_url,
				'category': listing.category,
				'type': listing.property_type,
				'country': listing.country,
				'price': listing.price,
				'address': listing.displayable_address,
				'report': listing.property_report_url
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [listing.longitude, listing.latitude]
			}
		};
		points.features.push(feature);
	};

	
	// use turf.within to compare set of points to a set of polygons, return points that fall within polygons
	var searchWithin = turfBuffer(crossFits, 8, 'miles');
	console.log(searchWithin.features[0].geometry.coordinates);
	
	return turfWithin(points, searchWithin);
};

server.get('/crossfits', function(req, res) {
	return res.sendFile(path.join(__dirname, 'geojsons/crossFits.json'));
	// could I do res.status(200).json(crossFits); instead?
});
// get list of properties for sale
server.get('/zoopla', function(req, res) {
	var country = req.country;
	var reJson;
	unirest.get('http://api.zoopla.co.uk/api/v1/property_listings.js?api_key=24hmsrwtvhzeemqd7gfk3qam&country=England')
	.end(function(response) {
		reJson = response.body;
		console.log('got res');
		// sort through the reJson.listing array, compare to crossfit locations, return matching features
		var filteredJson = filterResults(reJson);
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(filteredJson);
	});
});

server.listen(process.env.PORT || 3000);