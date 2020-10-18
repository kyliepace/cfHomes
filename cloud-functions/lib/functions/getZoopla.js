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
const ZooplaService_1 = __importDefault(require("../services/ZooplaService"));
const PlacesService_1 = __importDefault(require("../services/PlacesService"));
const GeoService_1 = __importDefault(require("../services/GeoService"));
const constants = __importStar(require("../constants.json"));
/**
 *
 * given search parameters return properties for sale
 * under 8 miles from a crossfit location
 */
function getZoopla(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { minPrice, maxPrice, bounds } = req.body;
            console.log('request received', JSON.stringify(req.body));
            const search = {
                price: {
                    min: minPrice,
                    max: maxPrice
                },
                bounds
            };
            const results = yield PlacesService_1.default.getSites(search);
            const points = ZooplaService_1.default.toFeatureCollection(results);
            // sort through the reJson.listing array, compare to crossfit locations, return matching features
            const filteredJson = yield GeoService_1.default.filterResults(points);
            res.setHeader('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', constants.url.allowAccess);
            res.set('Access-Control-Allow-Methods', 'POST');
            return res.status(200).json(filteredJson);
        }
        catch (err) {
            console.log(`error: ${err.message}`);
            return res.status(500).send(err.message);
        }
    });
}
exports.default = getZoopla;
