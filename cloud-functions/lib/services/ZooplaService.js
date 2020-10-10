"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiClient_1 = require("../clients/ApiClient");
const constants = require("../constants.json");
class ZooplaService {
    constructor() {
        this.apiClient = new ApiClient_1.default(constants.url.zoopla);
    }
    getSites({ price, bounds: [latmin, latmax, lonmin, lonmax] }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: process.env.ZOOPLA_API_KEY,
                lat_min: latmin,
                lat_max: latmax,
                lon_min: lonmin,
                lon_max: lonmax,
                minimum_price: price.minPrice,
                maximum_price: price.maxPrice,
                page_size: 100,
                page_number: 4,
                ordering: 'ascending',
                listing_status: 'sale'
            };
            const data = yield this.apiClient.get({
                params
            });
            return data;
        });
    }
    /**
     *
     * convert data returned from zoopla api into a feature collection
     */
    toFeatureCollection(data) {
        const features = data.map(listing => ({
            type: 'Feature',
            properties: {
                'street_name': listing.street_name,
                'image_url': listing.image_80_60_url,
                'url': listing.details_url,
                'category': listing.category,
                'type': listing.property_type,
                'country': listing.country,
                'price': listing.price,
                'address': listing.displayable_address,
                'report': listing.property_report_url
            },
            geometry: {
                type: 'Point',
                coordinates: [listing.longitude, listing.latitude]
            }
        }));
        return {
            type: 'FeatureCollection',
            features
        };
    }
}
exports.default = new ZooplaService();
