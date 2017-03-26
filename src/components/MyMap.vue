<template>
	<div id='mapDiv'>

	</div>
</template>

<script>
import L from 'leaflet';
import cfData from '../assets/UKCrossfits.json'; // I wanted to load this using fetch but wouldn't work
import GeoJSON from './makeGeoJson.js';

import '../../node_modules/leaflet/dist/leaflet.css'

export default {
	name: 'myMap',
	data () {
		return {
			myMap: false,
			tsUrl: '//a.tile.openstreetmap.org/{z}/{x}/{y}.png',
			gps: [],
			affiliateList: cfData,
			geoJson: {
				"type": "FeatureCollection",
				"features": []
			}
		}
	},
	mounted () {
		var myMap = L.map('mapDiv', {
			minZoom: 3,
			maxZoom: 18,
			inertia: true
		}).setView([53.1, -2.4], 8);
	
		L.tileLayer(this.tsUrl).addTo(myMap);
		myMap.invalidateSize(false);


		this.showLocations();
	},
	events: {},
	methods: {
	
		showLocations() {
			var myLayer; 
			var geojsonMarkerOptions = {
				radius: 4,
				fillColor: '#FF6075',
				color: 'black'
			};
			//var geojson = this.makeGeoJson(this.affiliateList.affiliates);
			var geojson = GeoJSON.parse(this.affiliateList.affiliates, {'Point': ['lat', 'lon']});
			myLayer = L.geoJson(geojson, {
				pointToLayer: function(feature, latlng) {
					return L.circle(latlng, 10, geojsonMarkerOptions);
				},
				// onEachFeature: function(feature, layer) {
				// 	feature.properties.layer = layer;
				// 	layer.on('click', function(e) {
				// 		map.openPopup(
				// 			L.popup()
				// 				.setLatLng(e.latlng)
				// 				.setContent(e.latlng.toString())
				// 		);
				// 	});
				// }
			}).addTo(this.map);
		},
		//updateMap() {

		 	// need to send coordinates to zoopla
			//this.$http.get('' + query)
		// 		.then(response => {

				// 	var myLayer; 
				// 	var geojsonMarkerOptions = {
				// 		radius: 4,
				// 		fillColor: '#FF6075',
				// 		color: 'black'
				// 	};

				// 	myLayer = L.geoJson(response.data, {
				// 		pointToLayer: function(feature, latlng) {
				// 			return L.circle(latlng, 10, geojsonMarkerOptions);
				// 		},
				// 		onEachFeature: function(feature, layer) {
				// 			feature.properties.layer = layer;
				// 			layer.on('click', function(e) {
				// 				map.openPopup(
				// 					L.popup()
				// 						.setLatLng(e.latlng)
				// 						.setContent(e.latlng.toString())
				// 				);
				// 			});
				// 		}
				// 	}).addTo(this.map);
				// 	this.map.fitBounds(myLayer.getBounds());
				// });
		// },
		// resetMat() {
		// 	this.map.invalidateSize(false);
		// }
	}
};
</script>
<style scoped>
	#mapDiv{
		height: 80vh;
		width: 90%;
		margin: auto;
		border: 1px solid black;
	}
</style>

