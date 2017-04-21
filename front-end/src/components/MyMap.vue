<template>
	<div id='mapDiv'>
		<v-map :minZoom='minZoom' :maxZoom='maxZoom' inertia='inertia' :zoom='zoom' :center='center'>
			<v-tilelayer :url='tsUrl'></v-tilelayer>
			<v-geojson-layer :geojson='cfGeoJson' :options='cfOptions'></v-geojson-layer>
			<v-geojson-layer :geojson='reGeoJson' :options='reOptions'></v-geojson-layer>
		</v-map>
	</div>
</template>

<script>
import L from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet/dist/images/marker-shadow.png';
import icon from '../../node_modules/leaflet/dist/images/marker-icon.png';
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
					return L.circle(latlng, 10, {radius: 41, fillColor: 'black'});
				},
				onEachFeature: function(feature, layer) {
					feature.properties.layer = layer;
					layer.bindPopup('<a href="'+feature.properties.website+'" target="_blank">'+feature.properties.name+'</a>');
				}
			}, 
			reOptions: {
				pointToLayer: function(feature, latlng) {
					return L.marker(latlng, {icon: L.icon({
							iconUrl: icon,
							iconSize: [20, 40]
						})
					});
				},
				onEachFeature: function(feature, layer) {
					feature.properties.layer = layer;
					layer.bindPopup('<img src="'+feature.properties.image_url+'"/><br/><a href="'+feature.properties.url+'" target="_blank">'+feature.properties.street_name +'</a><br/>&#163;'+feature.properties.price);
				}
			}
		}
	},
	props: ['cfGeoJson', 'reGeoJson'],
	mounted () {
		console.log('mounted map');
	},
	events: {},
	methods: {
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

