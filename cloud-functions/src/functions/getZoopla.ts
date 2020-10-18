import { Request, Response } from 'express';
import placesService from '../services/PlacesService';
import geoService from '../services/GeoService';
import IFeatureCollection from '../interfaces/IFeatureCollection';
import * as constants from '../constants.json';

/**
 * 
 * given search parameters return properties for sale
 * under 8 miles from a crossfit location
 */
export default async function getZoopla(req: Request, res: Response ): Promise<Response>{
  const allowAccess = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : constants.url.allowAccess;
  res.setHeader('Access-Control-Allow-Origin', allowAccess)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT')
  res.setHeader('Access-Control-Max-Age', '86400');

  try{
    // body-parser library could handle this but I'm not using express
    // sending as Cotnent-Type application/x-www-form-urlencoded because of preflight and CORS
    const data = JSON.parse(Object.keys(req.body)[0])
    console.log('request received', data)
  
    const results: any = await placesService.getSites(data);  
    const points: IFeatureCollection = placesService.toFeatureCollection(results);

    // sort through the reJson.listing array, compare to crossfit locations, return matching features
    const filteredJson = await geoService.filterResults(points);
    return res.status(200).json(filteredJson);
  }
  catch(err){
    console.log(`error: ${err.message}`)
    return res.status(500).send(err.message);
  }
}