import {
  ICustomer,
} from './../interfaces/customer.interface';
import {
  prop,
  plugin,
} from '@typegoose/typegoose';
import {
  AutoIncrementSimple,
} from '@typegoose/auto-increment';

@plugin(AutoIncrementSimple, [
  {
    field: 'id',
  },
])
export class Customer implements ICustomer {
  @prop({
    required: true,
    type: () => Number,
  })
  public id!: number;

  @prop({
    required: false,
    type: () => String,
  })
  public name: string | null = null;

  @prop({
    required: false,
    type: () => String,
  })
  public email: string | null = null;

  @prop({
    required: false,
    type: () => String,
  })
  public password: string | null = null;
}
