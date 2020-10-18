[DEMO](https://kyliepace.github.io/cfHomes/front-end/dist/)

A full-stack (MEVN) [leaflet](leafletjs.com) map showing UK CrossFits, as pulled from the [CrossFit HQ database](https://crossfit.com/cf/find-a-box.php). Made with [Vue2Leaflet](https://github.com/KoRiGaN/Vue2Leaflet).

Demonstrates using [Turf.js](turfjs.org) to build buffers around each crossfit point, and to filter [Foursquare API](https://developer.foursquare.com/docs/api-reference/venues/search/) results to only those locations within any buffer polygon.

![screenshot](cfHomes.png)

The backend is deployed as two Google cloud functions instead of as an express app, for more granular scalability. The front-end is a static webpage built with Nuxt.js.

This was originally built against the Zoopla property API to find homes for sale near crossfits (hence the name of this repo), but their API seems to have gone down.