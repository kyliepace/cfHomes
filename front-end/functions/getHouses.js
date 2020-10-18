import axios from 'axios';
const constants = require('../constants.json');

/**
 * 
 * get locations returned from getZoopla cloud function
 */
export default async function getHouses(data = {}){
  const url = `${constants.api.urls.cloud_endpoint[process.env.NODE_ENV]}/${constants.api.urls.houses}`;

  const axiosBody = {
    method: 'POST',
    url,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data
  };
  const response = await axios.request(axiosBody);
  console.log(`${response.data.features.length} locations received `)
  return response.data;
}