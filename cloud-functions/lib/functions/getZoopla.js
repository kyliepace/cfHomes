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
const ZooplaService_1 = require("../services/ZooplaService");
const GeoService_1 = require("../services/GeoService");
/**
 *
 * given search parameters return properties for sale
 * under 8 miles from a crossfit location
 */
function getZoopla(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { minPrice, maxPrice, bounds } = req.body;
            const results = yield ZooplaService_1.default.getSites({
                price: {
                    min: minPrice,
                    max: maxPrice
                },
                bounds
            });
            const points = ZooplaService_1.default.toFeatureCollection(results.listing);
            // sort through the reJson.listing array, compare to crossfit locations, return matching features
            const filteredJson = yield GeoService_1.default.filterResults(points);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(filteredJson);
        }
        catch (err) {
            console.log(`error: ${err.message}`);
            return res.status(500).send(err.message);
        }
    });
}
exports.default = getZoopla;
