
const fs = require('fs').promises;
import geoService from '../../src/services/GeoService';
import zooplaService from '../../src/services/ZooplaService';
import * as zooplaResponse from '../zoopla_response.json';
import * as crossfits from '../../../geojsons/crossFits.json';

describe('services > GeoService', () => {
  let points;

  before(() => {
    points = zooplaService.toFeatureCollection(zooplaResponse.listing);
  });

  describe('#filterResults', () => {
    let result;
    before(async () => {
      result = await geoService.filterResults(points, crossfits);
    });
    it('returns a subset of points feature collection', () => {
      (result.type).should.equal('FeatureCollection');
      (result.features.length).should.be.belowOrEqual(points.features.length);
    });
  });
});