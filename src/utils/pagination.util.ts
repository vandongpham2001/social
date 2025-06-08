import { Constant } from 'src/constants/constant';
import { BaseFilterDto } from 'src/dtos/request/base-filter.dto';
import { SortOrder } from 'src/enum/sort-order.enum';

export function resolvePaginationParams<T extends BaseFilterDto>(
  filter: T,
): { page: number; limit: number; sortBy: string; sortOrder: SortOrder } {
  const page =
    filter.page && filter.page > 0 ? filter.page : Constant.PAGINATION.PAGE;
  const limit =
    filter.limit && filter.limit > 0 ? filter.limit : Constant.PAGINATION.LIMIT;
  const sortBy = filter.sortBy || 'id';
  const sortOrder =
    filter.sortOrder?.toUpperCase() === SortOrder.DESC
      ? SortOrder.DESC
      : SortOrder.ASC;

  return { page, limit, sortBy, sortOrder };
}
