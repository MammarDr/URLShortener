import store from "../../app/store.ts";
import { HttpError } from "./httpError.ts";

export async function apiClient(
  url: string,
  options: RequestInit = {},
  requireAuth: boolean = true,
) {
  const token: string = store.getState().auth.accessToken;
  debugger;
  if (requireAuth && !token) {
    throw HttpError.Unauthenticated();
  }

  const response = await fetch("http://localhost:5203/api/" + url, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(requireAuth && { Authorization: `Bearer ${token}` }),
    },
  }).catch(() => {
    throw new HttpError(500, "Internal Server Error");
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    if (response.status === 401) throw HttpError.Unauthenticated();
    throw new HttpError(response.status, body.title ?? "Server Error", body);
  }

  const data = await response.json().catch(() => null);

  return { data, response };
}
