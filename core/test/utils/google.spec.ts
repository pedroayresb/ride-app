/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  expect,
} from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import googleFns from '../../src/utils/google';

describe('googleFns', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getLatLng', () => {
    it('should return the location geometry for a valid address', async() => {
      const address = '1600 Amphitheatre Parkway, Mountain View, CA';
      const mockResponse = {
        data: {
          results: [
            {
              geometry: {
                location: {
                  lat: 37.4224764,
                  lng: -122.0842499,
                },
              },
            },
          ],
        },
      };

      sinon.stub(axios, 'get').resolves(mockResponse);

      const result = await googleFns.getLatLng(address);
      expect(result).to.deep.equal(mockResponse.data.results[0].geometry.location);
    });

    it('should throw an error if no results are found', async() => {
      const address = 'Invalid Address';
      const mockResponse = {
        data: {
          results: [],
        },
      };

      sinon.stub(axios, 'get').resolves(mockResponse);

      try {
        await googleFns.getLatLng(address);
      } catch (error: any) {
        expect(error.message).to.equal('LATLNG_ERROR');
      }
    });

    it('should throw an error if the request fails', async() => {
      const address = '1600 Amphitheatre Parkway, Mountain View, CA';
      sinon.stub(axios, 'get').rejects(new Error('Request failed'));

      try {
        await googleFns.getLatLng(address);
      } catch (error: any) {
        expect(error.message).to.equal('LATLNG_ERROR');
      }
    });
  });

  describe('getRoute', () => {
    it('should return the route for valid origin and destination', async() => {
      const origin = {
        lat: () => 10,
        lng: () => 20,
      } as google.maps.LatLng;
      const destination = {
        lat: () => 20,
        lng: () => 30,
      } as google.maps.LatLng;
      const mockResponse = {
        data: {
          routes: [
            {
              distanceMeters: 50000,
              duration: '1 hour',
              polyline: {
                encodedPolyline: 'abcd1234',
              },
            },
          ],
        },
      };

      sinon.stub(axios, 'post').resolves(mockResponse);

      const result = await googleFns.getRoute(origin, destination);
      expect(result).to.deep.equal(mockResponse.data.routes[0]);
    });

    it('should throw an error if no routes are found', async() => {
      const origin = {
        lat: () => 10,
        lng: () => 20,
      } as google.maps.LatLng;
      const destination = {
        lat: () => 20,
        lng: () => 30,
      } as google.maps.LatLng;
      const mockResponse = {
        data: {
          routes: [],
        },
      };

      sinon.stub(axios, 'post').resolves(mockResponse);

      try {
        await googleFns.getRoute(origin, destination);
      } catch (error: any) {
        expect(error.message).to.equal('ROUTE_ERROR');
      }
    });

    it('should throw an error if the request fails', async() => {
      const origin = {
        lat: () => 10,
        lng: () => 20,
      } as google.maps.LatLng;
      const destination = {
        lat: () => 20,
        lng: () => 30,
      } as google.maps.LatLng;
      sinon.stub(axios, 'post').rejects(new Error('Request failed'));

      try {
        await googleFns.getRoute(origin, destination);
      } catch (error: any) {
        expect(error.message).to.equal('ROUTE_ERROR');
      }
    });
  });
});
