import ApiClient from "../clients/apiClient";
import * as constants from '../constants.json';

class ZooplaService {
  apiClient = new ApiClient(constants.url.zoopla);

  async getSites({price, bounds: [latmin, latmax, lonmin, lonmax]}){
    const params = {
      api_key: process.env.ZOOPLA_API_KEY,
      lat_min: latmin,
      lat_max: latmax,
      lon_min: lonmin,
      lon_max: lonmax,
      minimum_price: price.minPrice,
      maximum_price: price.maxPrice,
      page_size: 100,
      page_number: 4,
      ordering: 'ascending',
      listing_status: 'sale'
    };
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