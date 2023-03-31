import { PropertySearch, OperatorMap, WhereType } from '../interfaces';

export const Search = {
  operators(str: string): Function {
    const searchMap: OperatorMap = {
      eq: (f: string, v: string) => {
        return { [f]: v };
      },
      gt: (f: string, v: string) => {
        return { [f]: { gt: v } };
      },
      lt: (f: string, v: string) => {
        return { [f]: { lt: v } };
      },
      ne: (f: string, v: string) => {
        return { NOT: { [f]: v } };
      },
    };
    return searchMap[str];
  },
  condition(body: PropertySearch): WhereType {
    const where = this.operators(body.operator)(body.field, body.value);
    return where;
  },
};
