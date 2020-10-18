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


  try{
    // body-parser library could handle this but I'm not using express
    // sending as Cotnent-Type application/x-www-form-urlencoded because of preflight and CORS
    const data = JSON.parse(Object.keys(req.body)[0]);
    console.log('request received', data)
  
    const results: any = await placesService.getSites(data);  
<<<<<<< d708f0f8aa8a10b5e2455c36b56b4600fb81e306
    const points: IFeatureCollection = placesService.toFeatureCollection(results);
=======
    const points: IFeatureCollection = zooplaService.toFeatureCollection(results);
>>>>>>> send as application/x-www-form-urlencoded

    // sort through the reJson.listing array, compare to crossfit locations, return matching features
    const filteredJson = await geoService.filterResults(points, undefined, data.radiusOptions);
    return res.status(200).json(filteredJson);
  }
  catch(err){
    console.log(`error: ${err.message}`)
    return res.status(500).send(err.message);
  }
}