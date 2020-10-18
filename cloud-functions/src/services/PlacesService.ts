import ApiClient from "../clients/ApiClient";
import * as constants from '../constants.json';
import IFeatureCollection from "../interfaces/IFeatureCollection";

class PlacesService {
  apiClient = new ApiClient(constants.url.places);

  /**
   *  return locations from foursquare venue search
   *  https://developer.foursquare.com/docs/api-reference/venues/search/
   */
  async getSites({ center }) {
    const params: {[key: string]: any} = {
      client_id: process.env.PLACES_CLIENT_ID,
      client_secret: process.env.PLACES_CLIENT_SECRET,
      ll: center || constants.defaultSearch.center,
      // categoryId: [],
      v: '20201010',
      limit: 100
    };

    const data = await this.apiClient.get({
      params,
      url: 'search'
    });
    return data;
  }

  /**
   * 
   * convert data returned from zoopla api into a feature collection
   */
  toFeatureCollection(data?: any): IFeatureCollection {
    const features = data.response.venues.map((venue) => ({
      type: 'Feature',
      properties: {
        id: venue.id,
        name: venue.name,
        category: venue.categories[0]?.name,
        address: venue.location.address,
      },
      geometry: {
        type: 'Point',
        coordinates: [venue.location.lng, venue.location.lat]
      }
    }));
    return {
      type: 'FeatureCollection',
      features
    };
  }
}

export default new PlacesService();