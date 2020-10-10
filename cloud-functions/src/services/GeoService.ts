import { FeatureCollection } from '@turf/helpers';
import * as constants from '../constants.json';
import buffer from '@turf/buffer';
import within from '@turf/within';
import ApiClient from '../clients/apiClient';

class GeoService {
  crossfits?: FeatureCollection;
  apiClient = new ApiClient(constants.pathToCrossfitData);

  constructor(){
    this.loadCrossfits();
  }

  async loadCrossfits(): Promise<FeatureCollection> {
    const data = await this.apiClient.get();
    this.crossfits = JSON.parse(data);
    return this.crossfits;
  }

   /**
     * filter one geojson against another to return
     * only points within a certain distance of each other
     * 
     * don't want to load crossfit data each time
     */
    async filterResults(points: FeatureCollection, polygon: FeatureCollection = this.crossfits): FeatureCollection {    
      if (!polygon){
        polygon = await this.loadCrossfits();
      }  
      // use turf.within to compare set of points to a set of polygons, return points that fall within polygons
      const searchWithin = buffer(polygon, 8, 'miles');
      return within(points, searchWithin);
    };
}

export default new GeoService();