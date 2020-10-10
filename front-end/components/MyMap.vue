<template>
	<div id='mapDiv'>
    <client-only>
      <v-map :minZoom='minZoom' :maxZoom='maxZoom' inertia='inertia' :zoom='zoom' :center='center'>
        <v-tilelayer :url='tsUrl'></v-tilelayer>
        <v-geojson-layer :geojson='cfGeoJson' :options='cfOptions'></v-geojson-layer>
        <v-geojson-layer :geojson='reGeoJson' :options='reOptions'></v-geojson-layer>
      </v-map>
    </client-only>
	</div>
</template>

<script>
  import Vue from 'vue';
  const isBrowser = typeof window !== 'undefined';
  let L;
  let icon;
  let Vue2Leaflet = {}
  
  if (isBrowser) {
    require('../node_modules/leaflet/dist/leaflet.css');
    require('../node_modules/leaflet/dist/images/marker-shadow.png');
    icon = require('../node_modules/leaflet/dist/images/marker-icon.png');
    L = require('leaflet');
    Vue2Leaflet = require('vue2-leaflet')
  }
  if (process.client){
    Vue2Leaflet = require('vue2-leaflet')
  }

  Vue.component('v-map', Vue2Leaflet.LMap);
  Vue.component('v-tilelayer', Vue2Leaflet.LTileLayer);
  Vue.component('v-geojson-layer', Vue2Leaflet.LGeoJSON);
  Vue.component('v-marker', Vue2Leaflet.LMarker);
  Vue.component('v-popup', Vue2Leaflet.LPopup);

export default {
	name: 'myMap',
	components: {
		// 'v-map' : Vue2Leaflet.Map,
		// 'v-tilelayer': Vue2Leaflet.TileLayer,
		// 'v-geojson-layer': Vue2Leaflet.GeoJSON,
		// 'v-marker': Vue2Leaflet.Marker,
		// 'v-popup': Vue2Leaflet.Popup
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
					return isBrowser ? L.circle(latlng, 10, {radius: 41, fillColor: 'black'}) : undefined;
				},
				onEachFeature: function(feature, layer) {
					feature.properties.layer = layer;
					layer.bindPopup('<a href="'+feature.properties.website+'" target="_blank">'+feature.properties.name+'</a>');
				}
			}, 
			reOptions: {
				pointToLayer: function(feature, latlng) {
					return isBrowser ? L.marker(latlng, {icon: L.icon({
							iconUrl: icon,
							iconSize: [20, 40]
						})
					}) : undefined;
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

