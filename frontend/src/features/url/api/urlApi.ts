import { apiClient } from "../../../shared/api/apiClient";
import type { ICreateUrlDTO } from "../types";

export async function fetchUrl(id: number) {
  return apiClient(
    "https://localhost:7254/api/v1/Url/me/" + id,
    {
      method: "GET",
    },
    true,
  );
}
export async function fetchUrls(
  perPage: number,
  pageNumber: number,
  order: string,
) {
  return apiClient(
    `https://localhost:7254/api/v1/Url/me?PageSize=${perPage}&PageNumber=${pageNumber}&OrderBy=createdAt ${order}`,
    {
      method: "GET",
    },
    true,
  );
}

export async function createUrl({
  source,
  title,
  slug,
  active,
}: ICreateUrlDTO) {
  return apiClient(
    "https://localhost:7254/api/v1/Url/me",
    {
      method: "POST",
      body: JSON.stringify({
        Source: source,
        Title: title,
        ShortCode: slug,
        IsActive: active,
      }),
    },
    true,
  );
}
export async function updateUrl(
  id: string,
  source: string,
  title: string,
  slug: string,
  active: boolean,
) {
  return apiClient(
    `https://localhost:7254/api/v1/Url/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        source,
        title,
        slug,
        active,
      }),
    },
    true,
  );
}
export async function deleteUrl(id: string) {
  return apiClient(
    `https://localhost:7254/api/v1/Url/me/${id}`,
    {
      method: "DELETE",
    },
    true,
  );
}
