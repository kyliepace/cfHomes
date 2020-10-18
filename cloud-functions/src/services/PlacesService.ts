import ApiClient from "../clients/ApiClient";
import * as constants from '../constants.json';

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
      ll: center || '50.7243,-8.0018',
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
  toFeatureCollection(results?: any): any{
    const features = results.responses.venues.map((venue) => ({
      type: 'Feature',
      properties: {
        id: venue.id,
        name: venue.name,
        category: venue.categories[0].name,
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