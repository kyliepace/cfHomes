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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ApiClient {
    constructor(url) {
        this.baseUrl = url;
    }
    buildQueryString(params) {
        return Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
    }
    request(method, requestInfo) {
        const axiosBody = Object.assign({ method: method, baseURL: this.baseUrl }, requestInfo);
        return axios_1.default.request(axiosBody);
    }
    get(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request('GET', requestInfo);
            return response.data;
        });
    }
}
exports.default = ApiClient;
