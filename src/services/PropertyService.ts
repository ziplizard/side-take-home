// import AppDataSource from '../dataSource';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { Property } from '../entities';
import { Search, Pagination } from '../helpers';
import { PropertySearch } from '../interfaces';

// Todo: add TS response types

export const PropertyService = {
  async create(add: object) {
    const result = await prisma.property.create({ data: add });
    return result;
  },
  async update(id: number, put: object) {
    const result = await prisma.property.update({
      where: { id },
      data: put,
    });
    return result;
  },
  async search(body: PropertySearch) {
    const { page, size } = body;
    const where = Search.condition(body);
    const [data, count] = await prisma.property.findMany({
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
    const [data, count] = await prisma.property.findMany(Property, {
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
    const result = await prisma.property.findFirst({ id });
    return result;
  },
  async delete(id: number) {
    const result = await prisma.property.delete({
      where: { id },
    });
    return result;
  },
};
