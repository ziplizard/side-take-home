import AppDataSource from '../dataSource';
import { Property } from '../entities';

// Todo: add TS response types

export const PropertyService = {
  async create(add: Property) {
    const result = await AppDataSource.manager.insert(Property, add);
    return result;
  },
  async update(id: number, put: Property) {
    const result = await AppDataSource.manager.update(Property, id, put);
    return result;
  },
  async getAll(page: number, size: number) {
    // possibly toggle: if (!size) find() // all
    const [list, count] = await AppDataSource.manager.findAndCount(Property, {
      order: { id: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });

    const numOfPages = Math.ceil(count / size);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < count;

    return {
      data: list,
      meta: {
        page,
        size,
        total: count,
        numOfPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  },
  async getById(id: number) {
    const result = await AppDataSource.manager.findOneBy(Property, { id });
    return result;
  },
  async delete(id: number) {
    const result = await AppDataSource.manager.delete(Property, id);
    return result;
  },
};
