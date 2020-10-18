import { FeatureCollection, Units } from '@turf/helpers';
import * as constants from '../constants.json';
import buffer from '@turf/buffer';
import pointsWithinPolygon from '@turf/points-within-polygon'
import ApiClient from '../clients/ApiClient';
import IFeatureCollection from '../interfaces/IFeatureCollection';

class GeoService {
  crossfits;
  radiusOptions = {
    distance: constants.turf.distance,
    units: constants.turf.units as Units
  }
  apiClient = new ApiClient(constants.pathToCrossfitData);


  /**
   * get crossfits geojson from github
   */
  async loadCrossfits(): Promise<IFeatureCollection> {
    if (!this.crossfits){
      this.crossfits = await this.apiClient.get();
    }
    return this.crossfits;
  }

  /**
   * filter one geojson against another to return
   * only points within a certain distance of each other
   * 
   * don't want to load crossfit data each time
   */
  async filterResults(points, polygon = this.crossfits, radiusOptions = this.radiusOptions): Promise<FeatureCollection> {    
    if (!polygon){
      polygon = await this.loadCrossfits();
    }  
    // use turf.within to compare set of points to a set of polygons, return points that fall within polygons
    const searchWithin = buffer(polygon, this.radiusOptions.distance, {
      units: this.radiusOptions.units
    });
    const pointsNearCrossfit = pointsWithinPolygon(points, searchWithin);
    console.log(`${pointsNearCrossfit.features.length} locations found within radius`)
    const features = this.dedupePoints(pointsNearCrossfit.features);
    console.log(`${features.length} filtered locations found within radius`)

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
      const alreadyExists = acc.some(({properties}) => properties.name === point.properties.name);
      return alreadyExists ? acc : acc.concat(point);
    }, []);
  }
}

export default new GeoService();