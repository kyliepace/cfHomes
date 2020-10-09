export default interface IFeature {
  type: 'Feature',
  geometry: {
    type: string,
    coordinates: number[],
    properties?: any,
    [key: string]: any
  }
}