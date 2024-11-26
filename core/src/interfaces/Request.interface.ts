export interface IEstimateRequest {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface IConfirmRequest {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}
