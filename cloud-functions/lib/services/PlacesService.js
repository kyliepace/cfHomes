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
class PlacesService {
    constructor() {
        this.apiClient = new ApiClient_1.default(constants.url.places);
    }
    buildCategories(categoryId = constants.defaultSearch.categoryId) {
        return categoryId.toString();
    }
    /**
     *  return locations from foursquare venue search
     *  https://developer.foursquare.com/docs/api-reference/venues/search/
     */
    getSites({ center, categoryId }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const categories = this.buildCategories(categoryId);
            const params = {
                client_id: process.env.PLACES_CLIENT_ID,
                client_secret: process.env.PLACES_CLIENT_SECRET,
                ll: center || constants.defaultSearch.center,
                categoryId: categoryId,
                v: '20201010',
                limit: 100
            };
            const data = yield this.apiClient.get({
                params,
                url: 'search'
            });
            return data;
        });
    }
    /**
     *
     * convert data returned from zoopla api into a feature collection
     */
    toFeatureCollection(data) {
        const features = data.response.venues.map((venue) => {
            var _a;
            return ({
                type: 'Feature',
                properties: {
                    id: venue.id,
                    name: venue.name,
                    category: (_a = venue.categories[0]) === null || _a === void 0 ? void 0 : _a.name,
                    address: venue.location.address,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [venue.location.lng, venue.location.lat]
                }
            });
        });
        return {
            type: 'FeatureCollection',
            features
        };
    }
}
exports.default = new PlacesService();
