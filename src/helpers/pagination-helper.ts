import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  total?: number;
  sort_by?: string;
  sort_order?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sort_by: string;
  sort_order: SortOrder;
};

const calculate_pagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sort_by = options.sort_by || 'createdAt';
  const sort_order = options.sort_order || 'desc';
  return {
    page,
    limit,
    skip,
    sort_by,
    sort_order,
  };
};

export const pagination_helper = {
  calculate_pagination,
};
