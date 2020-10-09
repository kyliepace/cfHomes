import { Request, Response } from 'express';
import geoService from './services/GeoService';

export default async function getCrossfits(req: Request, res: Response): Promise<Response> {
  const crossfits = await geoService.loadCrossfits();
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(crossfits);
}