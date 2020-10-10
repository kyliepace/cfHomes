import { FeatureCollection, Units } from '@turf/helpers';
import * as constants from '../constants.json';
import buffer from '@turf/buffer';
import pointsWithinPolygon from '@turf/points-within-polygon'
import ApiClient from '../clients/apiClient';

class GeoService {
  crossfits;
  apiClient = new ApiClient(constants.pathToCrossfitData);

  constructor(){
    if (process.env.NODE_ENV === 'production'){
      this.loadCrossfits();
    }
  }

  /**
   * get crossfits geojson from github
   */
  async loadCrossfits() {
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
  async filterResults(points, polygon = this.crossfits): Promise<FeatureCollection> {    
    if (!polygon){
      polygon = await this.loadCrossfits();
    }  
    // use turf.within to compare set of points to a set of polygons, return points that fall within polygons
    const DISTANCE = constants.turf.distance;
    const UNITS = constants.turf.units as Units;
    const searchWithin = buffer(polygon, DISTANCE, {units: UNITS});
    const pointsNearCrossfit = pointsWithinPolygon(points, searchWithin);

    const features = this.dedupePoints(pointsNearCrossfit.features);
    return {
      ...pointsNearCrossfit,
      features
    };
  }

  /**
   * 
   * @param arrayOfPoints 
   * return deduplicated array as determined by property url
   */
  dedupePoints(arrayOfPoints){
    return arrayOfPoints.reduce((acc, point) => {
      const alreadyExists = acc.find(({properties}) => properties.url === point.properties.url);
      return alreadyExists ? acc : acc.concat(point);
    }, [])
  }
}

export default new GeoService();