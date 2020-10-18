[DEMO](https://kyliepace.github.io/cfHomes/front-end/dist/)

A full-stack (MEVN) [leaflet](leafletjs.com) map showing UK CrossFits, as pulled from the [CrossFit HQ database](https://crossfit.com/cf/find-a-box.php). Made with [Vue2Leaflet](https://github.com/KoRiGaN/Vue2Leaflet).

Demonstrates using [Turf.js](turfjs.org) to build buffers around each crossfit point, and to filter [Foursquare API](https://developer.foursquare.com/docs/api-reference/venues/search/) results to only those locations within any buffer polygon.

![screenshot](cfHomes.png)

The backend is deployed as two Google cloud functions instead of as an express app, for more granular scalability. The front-end is a static webpage built with Nuxt.js.

This was originally built against the Zoopla property API to find homes for sale near crossfits (hence the name of this repo), but their API seems to have gone down.

The point was to 1. replace an express app with cloud functions and 2. let the user drive a search and apply geo-spatial comparison against the results of that search. If there was no search and we just wanted to show a static list of all, say, bookshops within 5 miles of a crossfit, I'd rather pre-generate that as a geojson and serve it like how the list of crossfits are served here. I stuck the crossfit geojson up on github as quick free storage but one thing I might do better would be to build image tiles from this information for faster loading. 

Since foursquare locations and data are constantly changing, I'm happy to use their database instead of trying to build my own. The Zoopla API was better-suited to this project because I could specify lat and lon bounds based on the map view, while Foursquare just cares about a general urban location. I might miss some of the nearest locations because I only get 100 points from Foursquare and then query against the crossfit location. One thing I could do to address that for the user would be to show that more points may be available and add a sort of pagination to the mapped results.