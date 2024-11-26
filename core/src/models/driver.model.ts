import {
  prop,
  plugin,
} from '@typegoose/typegoose';
import {
  IDriver,
  IReview,
} from '../interfaces/driver.interface';
import {
  AutoIncrementSimple,
} from '@typegoose/auto-increment';

/**
 * Essa classe representa a avaliação do motorista.
 * A avaliação é composta por uma nota e um comentário.
 * @param rating - Nota dada pelo passageiro ao motorista.
 * @param comment - Comentário dado pelo passageiro ao motorista.
 */
export class Review implements IReview {
  /**
   * Nota dada pelo passageiro ao motorista.
   */
  @prop({
    required: true,
    type: () => Number,
  })
  public rating!: number;

  /**
   *  Comentário dado pelo passageiro ao motorista.
   */
  @prop({
    required: true,
    type: () => String,
  })
  public comment!: string;
}

/**
 * Essa classe representa o motorista no sistema.
 * O motorista é responsável por realizar as viagens. Possui os seguintes atributos:
 * @param id - Identificador do motorista.
 * @param name - Nome do motorista.
 * @param description - Descrição do motorista. Criada pelo próprio motorista.
 * @param vehicle - Veículo do motorista.
 * @param review - Avaliação do motorista. É um objeto que contém a nota e o comentário do passageiro.
 * @param value - Taxa cobrada pelo motorista por quilômetro rodado.
 * @param minimumKm - Quilometragem mínima que o motorista aceita realizar.
 */
@plugin(AutoIncrementSimple, [
  {
    field: 'id',
  },
])
export class Driver implements IDriver {
  /**
   * Identificador do motorista.
   */
  @prop({
    required: true,
    type: () => Number,
  })
  public id!: number;

  /**
   * Nome do motorista.
   */
  @prop({
    required: true,
    type: () => String,
  })
  public name!: string;

  /**
   * Descrição do motorista. Criada pelo próprio motorista.
   */
  @prop({
    required: true,
    type: () => String,
  })
  public description!: string;

  /**
   * Veículo do motorista.
   */
  @prop({
    required: true,
    type: () => String,
  })
  public vehicle!: string;

  /**
   * Avaliação do motorista. É um objeto que contém a nota e o comentário do passageiro.
   */
  @prop({
    required: true,
    type: () => Review,
  })
  public review!: IReview;

  /**
   * Taxa cobrada pelo motorista por quilômetro rodado.
   */
  @prop({
    required: true,
    type: () => Number,
  })
  public value!: number;

  /**
   * Quilometragem mínima que o motorista aceita realizar.
   */
  @prop({
    required: true,
    type: () => Number,
  })
  public minimumKm!: number;
}
