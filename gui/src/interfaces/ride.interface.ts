export interface IRideDriver {
  id: number;
  name: string;
}

export interface IRide {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IRideDriver;
  value: number;
  customerId: number;
}
