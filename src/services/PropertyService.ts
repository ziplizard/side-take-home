import AppDataSource from '../dataSource';
import { Property } from '../entities';
import { Search, Pagination } from '../helpers';
import { PropertySearch } from '../interfaces';

// Todo: add TS response types

export const PropertyService = {
  async create(add: Property) {
    const result = await AppDataSource.manager.save(Property, add);
    return result;
  },
  async update(id: number, put: Property) {
    const result = await AppDataSource.manager.update(Property, id, put);
    return this.getById(result.affected as number);
  },
  async search(body: PropertySearch) {
    const { page, size } = body;
    const where = Search.condition(body);
    const [data, count] = await AppDataSource.manager.findAndCount(Property, {
      where,
      order: { id: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });

    const { numOfPages, hasPrevPage, hasNextPage } = Pagination.paginate(
      page,
      size,
      count,
    );

    return {
      data,
      meta: {
        page,
        size,
        total: count,
        numOfPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  },
  async getAll(page: number, size: number) {
    const [data, count] = await AppDataSource.manager.findAndCount(Property, {
      order: { id: 'ASC' },
      skip: (page - 1) * size,
      take: size,
    });

    const { numOfPages, hasPrevPage, hasNextPage } = Pagination.paginate(
      page,
      size,
      count,
    );

    return {
      data,
      meta: {
        page,
        size,
        total: count,
        numOfPages,
        hasNextPage,
        hasPrevPage,
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
