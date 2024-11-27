import {
  IRide,
  IRideDriver,
} from '../interfaces/ride.interface';
import {
  prop,
  Ref,
} from '@typegoose/typegoose';
import {
  Driver,
} from './driver.model';
import {
  Customer,
} from './customer.model';

/**
 * Essa classe representa o motorista selecionado dentro de uma viagem.
 * A motorista é composto por:
 * @param id - Identificador do motorista. Aqui, o identificador é um número, que referência o identificador do motorista.
 * @param name - Nome do motorista.
 */
export class RideDriver implements IRideDriver {
  /**
   * Identificador do motorista. Aqui, o identificador é um número, que referência o identificador do motorista.
   * Caso utilizado a função .populate() do mongoose, o identificador será substituído pelo objeto do motorista.
   * Para isso, é necessário utilizar a função .populate() juntamente com a função isDocument(id) do typegoose.
   * Exemplo:
   * ```typescript
   * const ride = await RideModel.findById('id').populate('driver.id');
   * if (isDocument(ride.driver.id)) {
   *  console.log(ride.driver.id.name); // Fortemente tipado.
   * }
   */
  @prop({
    required: true,
    ref: () => Driver,
    type: () => Number,
  })
  public id!: Ref<Driver, number>;

  /**
   * Nome do motorista.
   */
  @prop({
    required: true,
    type: () => String,
  })
  public name!: string;
}

/**
 * Essa classe representa uma viagem realizada no sistema.
 * A viagem é composta por:
 * @param id - Identificador da viagem.
 * @param date - Data da viagem.
 * @param origin - Local de origem da viagem.
 * @param destination - Local de destino da viagem.
 * @param distance - Distância da viagem em quilômetros.
 * @param duration - Duração da viagem.
 * @param driver - Motorista que realizou a viagem.
 * @param value - Valor da viagem.
 */
export class Ride implements IRide {
  @prop({
    required: true,
    type: () => Number,
  })
  public id!: number;

  @prop({
    required: true,
    type: () => Date,
  })
  public date!: Date;

  @prop({
    required: true,
    type: () => String,
  })
  public origin!: string;

  @prop({
    required: true,
    type: () => String,
  })
  public destination!: string;

  @prop({
    required: true,
    type: () => Number,
  })
  public distance!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public duration!: string;

  @prop({
    required: true,
    type: () => RideDriver,
  })
  public driver!: RideDriver;

  @prop({
    required: true,
    type: () => Number,
  })
  public value!: number;

  @prop({
    required: true,
    type: () => Number,
    ref: () => Customer,
  })
  public customerId!: Ref<Customer, number>;
}
