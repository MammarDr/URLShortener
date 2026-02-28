import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import queryClient, { persister } from "./app/queryClient.ts";
import store from "./app/store.ts";
import router from "./app/router.tsx";

import "./app/index.css";
import ToastProvider from "./shared/toast/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ReduxProvider store={store}>
        <ToastProvider />
        <RouterProvider router={router} />
      </ReduxProvider>
    </PersistQueryClientProvider>
  </StrictMode>,
);
