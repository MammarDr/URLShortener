import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 60, // keep cache for 1 hour (must be >= persister maxAge)
      retry: (failureCount, error: any) => {
        if (error.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

export default queryClient;
