webpackJsonp([1,2],[,,,,,,,,,,,function(e,t,n){n(40);var r=n(1)(n(31),n(52),null,null);e.exports=r.exports},,,,,,,,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{size:{default:"40px"}},computed:{styles:function(){return{width:this.size,height:this.size}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(48),o=n.n(r),i=n(47),s=n.n(i),a=n(12),c=n.n(a),u=n(46),p=n.n(u);t.default={name:"app",components:{MyMap:o.a,AddressSearch:s.a,CubeSpin:p.a},data:function(){return{instructions:"Find houses for sale near a crossfit",crossFitGeoJson:"",realEstateGeoJson:"",showLoader:!1,propertyLength:"",currentBounds:[49.97,58.5,-8.05,1.72]}},beforeMount:function(){this.showCrossfits()},methods:{showCrossfits:function(){var e=this;c.a.get("/crossfits").then(function(t){e.crossFitGeoJson=t.data}).catch(function(t){e.errors.push(t)})},findRealEstate:function(e){var t=this;this.showLoader=!0,c.a.post("/zoopla",e).then(function(e){t.propertyLength=e.data.features.length,t.realEstateGeoJson=e.data,t.showLoader=!1}).catch(function(e){t.errors.push(e)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(103),o=n.n(r);t.default={name:"AddressSearch",data:function(){return{minPrice:"",maxPrice:""}},props:["handleClick","bounds"],methods:{onClick:function(){console.log("click"),o()("number"===this.minPrice&&o()("number"===this.maxPrice))&&this.handleClick({minPrice:this.minPrice,maxPrice:this.maxPrice,bounds:this.bounds})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),o=n.n(r),i=n(36),s=(n.n(i),n(45)),a=(n.n(s),n(44)),c=n.n(a),u=n(54),p=n.n(u);t.default={name:"myMap",components:{"v-map":p.a.Map,"v-tilelayer":p.a.TileLayer,"v-geojson-layer":p.a.GeoJSON,"v-marker":p.a.Marker,"v-popup":p.a.Popup},data:function(){return{tsUrl:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",zoom:8,center:[53.1,-2.4],inertia:!0,minZoom:3,maxZoom:18,cfOptions:{style:function(){return{weight:2,fillColor:"black",color:"black"}},pointToLayer:function(e,t){return o.a.circle(t,10,{radius:4,fillColor:"black"})},onEachFeature:function(e,t){e.properties.layer=t,t.bindPopup('<a href="'+e.properties.website+'" target="_blank">'+e.properties.name+"</a>")}},reOptions:{pointToLayer:function(e,t){return o.a.marker(t,{icon:o.a.icon({iconUrl:c.a,iconSize:[20,40]})})},onEachFeature:function(e,t){e.properties.layer=t,t.bindPopup('<img src="'+e.properties.image_url+'"/><br/><a href="'+e.properties.url+'" target="_blank">'+e.properties.street_name+"</a><br/>&#163;"+e.properties.price)}}}},props:["cfGeoJson","reGeoJson"],mounted:function(){},events:{},methods:{}}},,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,,function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII="},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC"},function(e,t,n){n(38);var r=n(1)(n(30),n(50),"data-v-4152e5b1",null);e.exports=r.exports},function(e,t,n){n(37);var r=n(1)(n(32),n(49),"data-v-19fb4dd8",null);e.exports=r.exports},function(e,t,n){n(39);var r=n(1)(n(33),n(51),"data-v-4b205868",null);e.exports=r.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{on:{submit:e.onClick}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.minPrice,expression:"minPrice"}],attrs:{placeholder:"minPrice"},domProps:{value:e.minPrice},on:{input:function(t){t.target.composing||(e.minPrice=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.maxPrice,expression:"maxPrice"}],attrs:{placeholder:"maxPrice"},domProps:{value:e.maxPrice},on:{input:function(t){t.target.composing||(e.maxPrice=t.target.value)}}}),e._v(" "),n("button",[e._v("Search")])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{staticClass:"spinner spinner--circle",style:e.styles,attrs:{viewBox:"0 0 66 66",xmlns:"http://www.w3.org/2000/svg"}},[n("circle",{staticClass:"path",attrs:{fill:"none","stroke-width":"6","stroke-linecap":"round",cx:"33",cy:"33",r:"30"}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"mapDiv"}},[n("v-map",{attrs:{minZoom:e.minZoom,maxZoom:e.maxZoom,inertia:"inertia",zoom:e.zoom,center:e.center}},[n("v-tilelayer",{attrs:{url:e.tsUrl}}),e._v(" "),n("v-geojson-layer",{attrs:{geojson:e.cfGeoJson,options:e.cfOptions}}),e._v(" "),n("v-geojson-layer",{attrs:{geojson:e.reGeoJson,options:e.reOptions}})],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"main"}},[n("h3",[e._v("Crossfit Homes")]),e._v(" "),e.showLoader?n("cube-spin",{attrs:{id:"loading"}}):e._e(),e._v(" "),e.propertyLength>0?n("p",[e._v(e._s(e.propertyLength)+" results")]):n("p",[e._v(e._s(e.instructions))]),e._v(" "),n("AddressSearch",{attrs:{id:"searchForm",handleClick:"findRealEstate",bounds:e.currentBounds}}),e._v(" "),n("MyMap",{attrs:{cfGeoJson:e.crossFitGeoJson,reGeoJson:e.realEstateGeoJson}})],1)},staticRenderFns:[]}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o=n(11),i=n.n(o);r.default.config.productionTip=!1,new r.default({el:"#app",template:"<App/>",components:{App:i.a}})}],[55]);
//# sourceMappingURL=app.9eb4cd23034fc832d6f1.js.map