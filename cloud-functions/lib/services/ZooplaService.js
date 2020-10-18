"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiClient_1 = __importDefault(require("../clients/ApiClient"));
const constants = __importStar(require("../constants.json"));
class ZooplaService {
    constructor() {
        this.apiClient = new ApiClient_1.default(constants.url.zoopla);
    }
    getSites({ price, bounds }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_key: process.env.ZOOPLA_API_KEY,
                // minimum_price: price.minPrice,
                // maximum_price: price.maxPrice,
                page_size: 100,
                page_number: 4,
                ordering: 'ascending',
                listing_status: 'sale'
            };
            if (bounds) {
                params.lat_min = bounds[0];
                params.lat_max = bounds[1];
                params.lon_min = bounds[2];
                params.lon_max = bounds[3];
            }
            const data = yield this.apiClient.get({
                params
            });
            console.log(data);
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
