import {
  FindOptionsWhere,
  Equal,
  LessThan, // OrEqual ?
  MoreThan, // OrEqual ?
  Not,
} from 'typeorm';
import { Property } from '../entities';
import { PropertySearch, OperatorMap, WhereType } from '../interfaces';

export const Search = {
  operators(str: string): Function {
    const searchMap: OperatorMap = {
      eq: Equal,
      gt: MoreThan,
      lt: LessThan,
      ne: Not,
    };
    return searchMap[str];
  },
  condition(body: PropertySearch): FindOptionsWhere<Property> {
    const where = {} as WhereType;
    where[body.field] = this.operators(body.operator)(body.value);
    return where;
  },
};
