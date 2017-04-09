<template>
	<div id='mapDiv'>
		<v-map :minZoom='minZoom' :maxZoom='maxZoom' inertia='inertia' :zoom='zoom' :center='center'>
			<v-tilelayer :url='tsUrl'></v-tilelayer>
			<v-geojson-layer :geojson = 'cfGeoJson' :options='cfOptions'>
				<!-- <v-popup :content="feature.properties.name"></v-popup> -->
			</v-geojson-layer>
	
		</v-map>
	</div>
</template>

<script>
import L from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet/dist/images/marker-shadow.png';
import '../../node_modules/leaflet/dist/images/marker-icon.png';
import Vue2Leaflet from 'vue2-leaflet';


export default {
	name: 'myMap',
	components: {
		'v-map' : Vue2Leaflet.Map,
		'v-tilelayer': Vue2Leaflet.TileLayer,
		'v-geojson-layer': Vue2Leaflet.GeoJSON,
		'v-marker': Vue2Leaflet.Marker,
		'v-popup': Vue2Leaflet.Popup
	},
	data () {
		return {
			tsUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			zoom: 8,
			center: [53.1, -2.4],
			inertia: true,
			minZoom: 3,
			maxZoom: 18,
			cfOptions: {
				style: function() {
					return{
						weight: 2,
						fillColor: 'black',
						color: 'black'
					}
				},
				pointToLayer: function(feature, latlng) {
					return L.circle(latlng, 10, {radius: 4, fillColor: 'black'});
				},
				onEachFeature: function(feature, layer) {
					feature.properties.layer = layer;
					layer.bindPopup(feature.properties.name);
				}
			}
		}
	},
	props: ['cfGeoJson', 'reGeoJson'],
	mounted () {
	},
	events: {},
	methods: {
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

