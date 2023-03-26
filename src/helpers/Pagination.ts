import { PaginagteResponse } from '../interfaces';

export const Pagination = {
  paginate(page: number, size: number, count: number): PaginagteResponse {
    const numOfPages = Math.ceil(count / size);
    const hasPrevPage = page > 1;
    const hasNextPage = page < numOfPages;

    return { numOfPages, hasNextPage, hasPrevPage };
  },
};
