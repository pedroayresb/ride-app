import {
  IEstimateResponse,
  ICustomerRidesResponse,
  IConfirmResponse,
} from '../interfaces/Response.interface';
import {
  IEstimateRequest,
  IConfirmRequest,
} from '../interfaces/Request.interface';
import api from './api';

async function estimateRide(estimateRequest: IEstimateRequest) {
  const {
    data,
  } = await api.post<IEstimateResponse>('/ride/estimate', estimateRequest, {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });

  return data;
}

async function confirmRide(confirmRequest: IConfirmRequest) {
  const {
    data,
  } = await api.patch<IConfirmResponse>('/ride/confirm', confirmRequest, {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });

  return data;
}

async function getCustomerRides(customerId: string, driver_id?: string) {
  const {
    data,
  } = await api.get<ICustomerRidesResponse>(`/ride/${customerId}`, {
    params: {
      driver_id,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  });

  return data;
}

const rideApi = {
  estimateRide,
  confirmRide,
  getCustomerRides,
};

export default rideApi;
