import axios from 'axios';
const constants = require('../constants.json');

export default async function getHouses(obj){
  const axiosBody = {
    method: 'POST',
    baseURL: constants.api.urls.cloud_endpoint,
    url: constants.api.urls.houses,
    headers: {'Content-Type': 'application/json'},
    data: obj
  };
  const response = await axios.request(axiosBody);
  return response.data
}