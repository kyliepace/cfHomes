import { Request, Response } from 'express';
import ZooplaService from './services/ZooplaService';
import geoService from './services/GeoService';
import IFeatureCollection from './interfaces/IFeatureCollection';

/**
 * 
 * given search parameters return properties for sale
 * under 8 miles from a crossfit location
 */
export default async function getZoopla(req: Request, res: Response ): Promise<Response>{
  const { 
    minPrice,
    maxPrice,
    bounds
  } = req.body;

  const zooplaService = new ZooplaService();
  const results = await zooplaService.getSites({
    price: {
      min: minPrice,
      max: maxPrice
    },
    bounds
  });

  const points: IFeatureCollection = zooplaService.toFeatureCollection(results.listing);

  // sort through the reJson.listing array, compare to crossfit locations, return matching features
  const filteredJson = await geoService.filterResults(points);
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(filteredJson);
}