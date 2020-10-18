import { Request, Response } from 'express';
import geoService from '../services/GeoService';
import * as constants from '../constants.json';

export default async function getCrossfits(req: Request, res: Response): Promise<Response> {
  try {
    const crossfits = await geoService.loadCrossfits();
    res.setHeader('Content-Type', 'application/json');
    const allowAccess = process.env.NODE_ENV === 'development' ? '*' : constants.url.allowAccess;
    res.set('Access-Control-Allow-Origin', allowAccess)
    res.set('Access-Control-Allow-Methods', 'POST')
    return res.status(200).json(crossfits);
  }
  catch(err){
    console.log(`error: ${err.message}`)
    return res.status(500).send(err.message);
  }
}