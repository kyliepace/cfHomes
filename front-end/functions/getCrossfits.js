import axios from 'axios';
const constants = require('../constants.json');

export default async function getCrossfits(){
  const axiosBody = {
    method: 'POST',
    baseURL: constants.api.urls.cloud_endpoint,
    url: constants.api.urls.crossfit
  };
  const response = await axios.request(axiosBody);
  return response.data
}