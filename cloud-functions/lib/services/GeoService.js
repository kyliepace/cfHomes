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
const constants = __importStar(require("../constants.json"));
const buffer_1 = __importDefault(require("@turf/buffer"));
const points_within_polygon_1 = __importDefault(require("@turf/points-within-polygon"));
const ApiClient_1 = __importDefault(require("../clients/ApiClient"));
class GeoService {
    constructor() {
        this.apiClient = new ApiClient_1.default(constants.pathToCrossfitData);
    }
    /**
     * get crossfits geojson from github
     */
    loadCrossfits() {
        return __awaiter(this, void 0, void 0, function* () {
            this.crossfits = yield this.apiClient.get();
            return this.crossfits;
        });
    }
    /**
     * filter one geojson against another to return
     * only points within a certain distance of each other
     *
     * don't want to load crossfit data each time
     */
    filterResults(points, polygon = this.crossfits) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!polygon) {
                polygon = yield this.loadCrossfits();
            }
            // use turf.within to compare set of points to a set of polygons, return points that fall within polygons
            const DISTANCE = constants.turf.distance;
            const UNITS = constants.turf.units;
            const searchWithin = buffer_1.default(polygon, DISTANCE, { units: UNITS });
            const pointsNearCrossfit = points_within_polygon_1.default(points, searchWithin);
            const features = this.dedupePoints(pointsNearCrossfit.features);
            return Object.assign(Object.assign({}, pointsNearCrossfit), { features });
        });
    }
    /**
     *
     * @param arrayOfPoints
     * return deduplicated array as determined by property url
     */
    dedupePoints(arrayOfPoints) {
        return arrayOfPoints.reduce((acc, point) => {
            const alreadyExists = acc.find(({ properties }) => properties.url === point.properties.url);
            return alreadyExists ? acc : acc.concat(point);
        }, []);
    }
}
exports.default = new GeoService();
