import axios from 'axios';

export type LatLngResponse = {
  address_components: google.maps.GeocoderAddressComponent[];
  formatted_address: string;
  geometry: google.maps.GeocoderGeometry;
  place_id: string;
  types: string[];
};

export type RouteReponse = {
  distanceMeters: number;
  duration: string;
  polyline: {
    encodedPolyline: string;
  };
};

const API_KEY = process.env.GOOGLE_API_KEY || '';

async function getLatLng(address: string) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + API_KEY;

    const {
      data,
    } = await axios.get<{ results: LatLngResponse[] }>(url);

    const {
      results,
    } = data;

    if (!results.length) {
      throw new Error('INVALID_ADDRESS');
    }

    const {
      geometry,
    } = results[0];

    return geometry.location;
  } catch (error) {
    console.error('Error getting latlng', error);
    throw new Error('LATLNG_ERROR');
  }
}

async function getRoute(origin: google.maps.LatLng, destination: google.maps.LatLng) {
  try {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const {
      data,
    } = await axios.post<{ routes: RouteReponse[] }>(
      url,
      {
        origin: {
          location: {
            latLng: origin,
          },
        },
        destination: {
          location: {
            latLng: destination,
          },
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
        languageCode: 'pt-BR',
        units: 'METRIC',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
        },
      },
    );

    if (!data.routes.length) {
      throw new Error('NO_ROUTE_FOUND');
    }

    return data.routes[0];
  } catch (error) {
    console.error('Error getting route', error);
    throw new Error('ROUTE_ERROR');
  }
}

const googleFns = {
  getLatLng,
  getRoute,
};

export default googleFns;
