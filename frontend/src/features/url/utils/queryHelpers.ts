import { Query, QueryClient } from "@tanstack/react-query";
import type { IUrlResponse, IUrl } from "../types";
import store from "../../../app/store";

export function shiftPaginatedCache(
  queryClient: QueryClient,
  baseKey: unknown[],
  currentPage: number,
  deletedId: string,
): Array<any[]> {
  const queries = queryClient.getQueryCache().findAll({ queryKey: baseKey });

  if (!queries.length) return [];

  const sorted = queries
    .map((q) => ({
      queryKey: q.queryKey,
      data: q.state.data as IUrlResponse,
      page: q.queryKey[2] as number,
    }))
    .sort((a, b) => a.page - b.page);

  let carry: IUrl | null = null;

  sorted[currentPage - 1].data.data = sorted[currentPage - 1].data.data.filter(
    (item) => item.id !== deletedId,
  );

  const mainTotalCount =
    (sorted[currentPage - 1]?.data?.pagination?.TotalCount || 1) - 1;
  const mainPageSize = sorted[currentPage - 1]?.data?.pagination?.PageSize || 5;
  const mainTotalPages = Math.ceil(mainTotalCount / mainPageSize);

  let i = 0;
  for (; i < currentPage - 1; i++) {
    const { queryKey, data } = sorted[i];
    queryClient.setQueryData(queryKey, {
      data: data.data,
      pagination: data.pagination
        ? {
            ...data.pagination,
            TotalCount: mainTotalCount,
            TotalPages: mainTotalPages,
          }
        : null,
    });
  }

  while (true) {
    const { queryKey, data } = sorted[i];
    if (!data) return sorted.slice(i).map((q) => q.queryKey) as Array<any[]>;

    let newData = data.data;

    const next = sorted[i + 1];
    if (next?.data?.data.length > 0) {
      carry = next.data.data.splice(0, 1)[0];
      newData.push(carry);
      data.pagination!.HasNext = next.data.data.length > 1;
    }

    queryClient.setQueryData(queryKey, {
      data: newData,
      pagination: data.pagination
        ? {
            ...data.pagination,
            TotalCount: mainTotalCount,
            TotalPages: mainTotalPages,
          }
        : null,
    });

    if (newData.length === 0) queryClient.removeQueries({ queryKey });

    if (i + 1 >= sorted.length) {
      return [sorted[i].queryKey] as Array<any[]>;
    }

    if (sorted[i + 1].data.pagination?.CurrentPage === i + 2) {
      i++;
      continue;
    }

    return sorted.slice(i + 1).map((q) => q.queryKey) as Array<any[]>;
  }
}

export function insertAndshiftPaginatedCache(
  queryClient: QueryClient,
  baseKey: unknown[],
  newItem: IUrl,
): Array<any[]> {
  const queries = queryClient.getQueryCache().findAll({ queryKey: baseKey });

  if (!queries.length) return [];

  const sorted = queries
    .map((q) => ({
      queryKey: q.queryKey,
      data: q.state.data as IUrlResponse,
      page: q.queryKey[2] as number,
    }))
    .sort((a, b) => a.page - b.page);

  let carry: IUrl | null = newItem;

  const mainTotalCount = (sorted[0]?.data?.pagination?.TotalCount || 0) + 1;
  const mainPageSize = sorted[0]?.data?.pagination?.PageSize || 5;
  const mainTotalPages = Math.ceil(mainTotalCount / mainPageSize);

  for (let i = 0; 0 < sorted.length; i++) {
    const { queryKey, data } = sorted[i];

    const temp = carry;
    if (sorted[i].data.data.length === 5) {
      carry = sorted[i].data.data.pop()!;
    }
    queryClient.setQueryData(queryKey, {
      data: [temp, ...data.data],
      pagination: data.pagination
        ? {
            ...data.pagination,
            TotalCount: mainTotalCount,
            TotalPages: mainTotalPages,
          }
        : null,
    });

    if (i + 1 >= sorted.length) break;

    if (sorted[i + 1].data.pagination?.CurrentPage === i + 2) {
      continue;
    }

    return sorted.slice(i + 1).map((q) => q.queryKey) as Array<any[]>;
  }

  return [];
}
