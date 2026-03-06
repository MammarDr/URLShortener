import {
  useMutation,
  useMutationState,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { deleteUrl, fetchUrls } from "../api/urlApi";
import URLItem, { URLItemSkeleton } from "./URLItem";
import type { IUrl, IUrlResponse } from "../types";
import Paging from "../../../shared/components/Paging";
import { useAuth } from "../../auth/hooks/useAuth";
import queryClient from "../../../app/queryClient";
import { displayError, toast } from "../../../shared/toast/toasts";
import { FAKE_DATA } from "../utils/consts";
import { shiftPaginatedCache } from "../utils/queryHelpers";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function URLItems({
  perPage,
  order,
}: {
  perPage: number;
  order: string;
}) {
  const navigate = useNavigate();
  const { currentPage } = useSelector((state: RootState) => state.url);
  const { isAuthenticated } = useAuth();
  const deleteMutation = useMutation({
    mutationKey: ["deleteUrl"],
    mutationFn: (id: string) => deleteUrl(id),
    onSuccess: async (_data, id) => {
      const invalidateCaches = shiftPaginatedCache(
        queryClient,
        ["urls", isAuthenticated],
        currentPage,
        id,
      );

      toast.success("Success", "Shortened Url Was Deleted.");

      for (const queryKey of invalidateCaches) {
        await queryClient.cancelQueries({ queryKey, exact: true });
        queryClient.invalidateQueries({ queryKey, exact: true });
      }
    },
    onError: (error) => displayError(error, "Failed To Delete Url"),
  });

  const deletingIds = useMutationState<string>({
    filters: { mutationKey: ["deleteUrl"], status: "pending" },
    select: (mutation) => mutation.state.variables as string,
  });

  const {
    data: responseData,
    isFetching,
    isFetchedAfterMount,
    isStale,
  } = useSuspenseQuery({
    queryKey: ["urls", isAuthenticated, currentPage, perPage, order],
    queryFn: async (): Promise<IUrlResponse> => {
      if (!isAuthenticated)
        return Promise.resolve({
          data: FAKE_DATA,
          pagination: {
            CurrentPage: 1,
            PageSize: perPage,
            TotalPages: Math.ceil(FAKE_DATA.length / perPage),
            TotalCount: FAKE_DATA.length,
            HasNext: false,
            HasPrevious: false,
          },
        });

      console.log("load " + currentPage);
      const res = await fetchUrls(perPage, currentPage, order);
      const paginationHeader = res.response?.headers?.get("X-Pagination");
      const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
      return { data: res.data, pagination };
    },

    refetchOnMount: "always",
  });

  const { data, pagination }: IUrlResponse = responseData;
  useEffect(() => {
    if (!pagination || !isAuthenticated) return;

    const nextPage = currentPage + 1;
    if (nextPage > pagination.TotalPages) return;

    if (
      queryClient.getQueryData([
        "urls",
        isAuthenticated,
        nextPage,
        perPage,
        order,
      ])
    ) {
      return;
    }

    console.log("load " + nextPage);
    queryClient
      .prefetchQuery({
        queryKey: ["urls", isAuthenticated, nextPage, perPage, order],
        queryFn: () =>
          fetchUrls(perPage, nextPage, order).then((res) => {
            const paginationHeader = res.response?.headers?.get("X-Pagination");
            const pagination = paginationHeader
              ? JSON.parse(paginationHeader)
              : null;
            return { data: res.data, pagination };
          }),
      })
      .catch(() => null);
  }, [currentPage]);

  const onEdit = (url: IUrl) => {
    navigate("/edit", { state: { url } });
  }

  const shouldShowSkeleton = isFetching && isFetchedAfterMount && isStale;

  return (
    <>
      {!isFetchedAfterMount && shouldShowSkeleton ? (
        <div id="url-list" className="flex flex-col gap-y-3 mb-4">
          {Array.from({ length: 2 }).map(() => (
            <URLItemSkeleton key={Math.random()} />
          ))}
        </div>
      ) : (
        <>
          <div id="url-list" className="flex flex-col gap-y-3 mb-4">
            {data.map((item: IUrl) => (
              <URLItem
                key={item.id}
                url={item}
                isDeleting={deletingIds.includes(item.id)}
                onDelete={() => deleteMutation.mutate(item.id)}
                onEdit={onEdit}
              />
            ))}
          </div>
          {pagination && (
            <div className="flex justify-center">
              <Paging
                currentPage={currentPage}
                perPage={pagination.PageSize}
                totalPages={pagination.TotalPages}
                totalElements={pagination.TotalCount}
              />
            </div>
          )}
          {}
        </>
      )}
    </>
  );
}

