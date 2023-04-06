import { Prisma, Property } from '@prisma/client';
import prisma from '../prisma';
import { Search, Pagination } from '../helpers';
import { PropertySearch } from '../interfaces';

// Todo: add TS response types

export const PropertyService = {
  async create(add: Property) {
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
    const where = Search.condition(body) as Prisma.PropertyWhereInput;
    const find = {
      where,
      orderBy: { id: 'asc' } as Prisma.PropertyOrderByWithRelationInput,
      skip: ((page - 1) * size) as number,
      take: size as number,
    };
    const data = await prisma.property.findMany(find);

    const { numOfPages, hasPrevPage, hasNextPage } = Pagination.paginate(
      page,
      size,
      data.length,
    );

    return {
      data,
      meta: {
        page,
        size,
        total: data.length,
        numOfPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  },
  async getAll(page: number, size: number) {
    const resp = await prisma.property.findMany({});
    const total = resp.length;
    const data = await prisma.property.findMany({
      orderBy: { id: 'asc' } as Prisma.PropertyOrderByWithRelationInput,
      skip: ((page - 1) * size) as number,
      take: size as number,
    });

    const { numOfPages, hasPrevPage, hasNextPage } = Pagination.paginate(
      page,
      size,
      total,
    );

    return {
      data,
      meta: {
        page,
        size,
        total,
        numOfPages,
        hasNextPage,
        hasPrevPage,
      },
    };
  },
  async getById(id: number) {
    const result = await prisma.property.findFirst({ where: { id } });
    return result;
  },
  async delete(id: number) {
    const result = await prisma.property.delete({ where: { id } });
    return result;
  },
};
