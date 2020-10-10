import axios from 'axios';
const constants = require('../constants.json');

export default async function getCrossfits(){
  const url = `${constants.api.urls.cloud_endpoint[process.env.NODE_ENV]}/${constants.api.urls.crossfit}`;
  const axiosBody = {
    method: 'POST',
    url
  };
  console.log('axiosing', axiosBody)

  const response = await axios.request(axiosBody);
  console.log(`${response.data.features.length} crossfits received: `)
  return response.data
}