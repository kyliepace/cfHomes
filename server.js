const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const server = express();
var unirest = require('unirest');
const turfBuffer = require('@turf/buffer');
const turfWithin = require('@turf/within');

server.use(express.static(path.join(__dirname, 'back-end/public'))); //send public files to client
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


var crossFits;
fs.readFile('back-end/geojsons/crossFits.json', 'utf8', function(err, data){
	if(err) throw err;
	crossFits = JSON.parse(data);
});

// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }

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
	
	return turfWithin(points, searchWithin);
};

server.get('/', function(req, res){
	return res.render('public/index.html');
});

server.get('/crossfits', function(req, res) {
	return res.sendFile(path.join(__dirname, 'back-end/geojsons/crossFits.json'));
	// could I do res.status(200).json(crossFits); instead?
});
// get list of properties for sale
server.get('/zoopla', function(req, res) {
	var reJson;
	// use min, max lat and lon to get results for all of UK
	// get only results <= 300,000 gbp
	// get 400 results
	unirest.get('http://api.zoopla.co.uk/api/v1/property_listings.js?api_key=24hmsrwtvhzeemqd7gfk3qam&lat_min=49.968&lat_max=58.5&lon_min=-8.05&lon_max=1.72&maximum_price=300000&page_size=100&page_number=4&ordering=ascending&listing_status=sale')
	.end(function(response) {
		reJson = response.body;
		console.log('got res');
		// sort through the reJson.listing array, compare to crossfit locations, return matching features
		var filteredJson = filterResults(reJson);
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(filteredJson);
	});
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("server running");
});