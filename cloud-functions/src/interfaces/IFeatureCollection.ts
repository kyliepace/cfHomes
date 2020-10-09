import IFeature from './IFeature';

export default interface IFeatureCollection {
  type: 'FeatureCollection',
  features: IFeature[]
}