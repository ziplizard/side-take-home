import { PropertySearch, OperatorMap, WhereType } from '../interfaces';

export const Search = {
  operators(str: string): Function {
    const searchMap: OperatorMap = {
      eq: (f: string, v: string) => {
        return { [f]: v }; // can be string or number
      },
      gt: (f: string, v: string) => {
        return { [f]: { gt: parseInt(v) } };
      },
      lt: (f: string, v: string) => {
        return { [f]: { lt: parseInt(v) } };
      },
      ne: (f: string, v: string) => {
        return { NOT: { [f]: v } }; // can be string or number
      },
    };
    return searchMap[str];
  },
  condition(body: PropertySearch): WhereType {
    const where = this.operators(body.operator)(body.field, body.value);
    return where;
  },
};
