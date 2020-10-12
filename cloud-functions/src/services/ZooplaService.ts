import ApiClient from "../clients/ApiClient";
import * as constants from '../constants.json';

class ZooplaService {
  apiClient = new ApiClient(constants.url.zoopla);

  async getSites({ price, bounds}) {
    const params: {[key: string]: any} = {
      api_key: process.env.ZOOPLA_API_KEY,
      minimum_price: price.minPrice,
      maximum_price: price.maxPrice,
      page_size: 100,
      page_number: 4,
      ordering: 'ascending',
      listing_status: 'sale'
    };
    if (bounds){
      params.lat_min = bounds[0];
      params.lat_max = bounds[1];
      params.lon_min = bounds[2];
      params.lon_max = bounds[3];
    }
    const data = await this.apiClient.get({
      params
    });
    return data;
  }

  /**
   * 
   * convert data returned from zoopla api into a feature collection
   */
  toFeatureCollection(data?: any): any{
    const features = data.map(listing => ({
      type: 'Feature',
      properties: {
        'street_name': listing.street_name,
        'image_url': listing.image_80_60_url,
        'url' : listing.details_url,
        'category': listing.category,
        'type': listing.property_type,
        'country': listing.country,
        'price': listing.price,
        'address': listing.displayable_address,
        'report': listing.property_report_url
      },
      geometry: {
        type: 'Point',
        coordinates: [listing.longitude, listing.latitude]
      }
    }));
    return {
      type: 'FeatureCollection',
      features
    };
  }
}

export default new ZooplaService();