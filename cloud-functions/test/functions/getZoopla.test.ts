import { mockRequest, mockResponse } from 'mock-req-res';
import { createSandbox } from 'sinon';
import 'should-sinon';
import zooplaService from '../../src/services/ZooplaService';
import geoService from '../../src/services/GeoService';
import getZoopla from '../../src/functions/getZoopla';
import * as zooplaResponse from '../zoopla_response.json';

describe('functions > getZoopla', () => {
  let req, res;
  let sandbox;
  let geoServiceStub;
  let getSites;

  const searchParams = {
    body: {
      minPrice: 10000,
      maxPrice: 30000,
      bounds: [10, 20, -10, 10]
    }
  };

  before(() => {
    req = mockRequest(searchParams);
    res = mockResponse();
    sandbox = createSandbox();
    geoServiceStub = sandbox.stub(geoService, 'filterResults').resolvesArg(0);
    getSites = sandbox.stub(zooplaService, 'getSites').resolves(zooplaResponse);
  });

  after(() => {
    sandbox.restore();
  });

  describe('getSites throws error', () => {
    before(async () => {
      sandbox.resetHistory();
      res.json.resetHistory();
      res.status.resetHistory();
      getSites.rejects(new Error('bad connection'));
      await getZoopla(req, res);
    });
    it('should return 500', () => {
      (res.status).should.be.calledWith(500);
    });
    it('should return error message', () => {
      (res.send).should.be.calledWith('bad connection');
    });
  });

  describe('success', () => {
    before(async () => {
      res.json.resetHistory();
      res.status.resetHistory();
      getSites.reset();
      getSites.resolves(zooplaResponse);
      await getZoopla(req, res);
    });
    it('should call getSites with price and bounds', () => {
      getSites.should.be.calledWith({
        price: {
          min: 10000,
          max: 30000
        },
        bounds: searchParams.body.bounds
      });
    });

    it('should call filterResults with a feature collection', () => {
      (geoServiceStub.args[0][0]).should.have.property('type');
      (geoServiceStub.args[0][0].type).should.equal('FeatureCollection');
      (geoServiceStub.args[0][0]).should.have.property('features');
      (geoServiceStub.args[0][0].features.length).should.equal(zooplaResponse.listing.length);
    });

    it('should return 200', () => {
      (res.status).should.be.calledWith(200);
    });
    it('should return geojson', () => {
      (res.json).should.be.calledWith(geoServiceStub.args[0][0]);
    });
  });
})