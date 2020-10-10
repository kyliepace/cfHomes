import { mockRequest, mockResponse } from 'mock-req-res';
import { createSandbox } from 'sinon';
import 'should-sinon';
import geoService from '../../src/services/GeoService';
import getCrossfits from '../../src/functions/getCrossfits';

describe('functions > getCrossfits', () => {
  let req, res;
  let sandbox;
  let geoServiceStub;

  before(() => {
    req = mockRequest();
    res = mockResponse();
    sandbox = createSandbox();
    geoServiceStub = sandbox.stub(geoService, 'loadCrossfits');
  });

  after(() => {
    sandbox.restore();
  });

  describe('geoService throws error', () => {
    before(async () => {
      sandbox.resetHistory();
      res.json.resetHistory();
      res.status.resetHistory();
      geoServiceStub.rejects(new Error('bad connection'));
      await getCrossfits(req, res);
    });
    it('should return 500', () => {
      (res.status).should.be.calledWith(500);
    });
    it('should return error message', () => {
      (res.send).should.be.calledWith('bad connection');
    });
  });

  describe('success', () => {
    const geojson = {type: 'FeatureCollection', features: []};
    before(async () => {
      res.json.resetHistory();
      res.status.resetHistory();
      geoServiceStub.reset();
      geoServiceStub.resolves(geojson);
      await getCrossfits(req, res);
    });
    it('should return 200', () => {
      (res.status).should.be.calledWith(200);
    });
    it('should return geojson', () => {
      (res.json).should.be.calledWith(geojson)
    });
  });
})