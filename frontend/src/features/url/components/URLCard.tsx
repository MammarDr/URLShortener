import { URLItemSkeleton } from "./URLItem";
import Filter from "../../../shared/components/icons/Filter";
import URLItems from "./URLItems";
import { Suspense } from "react";
import ErrorBoundary from "../../../shared/components/ErrorBoundary";
import { useAuth } from "../../auth/hooks/useAuth";
import Linkoff from "../../../shared/components/icons/Linkoff";

const PER_PAGE = 5;

export default function URLCard() {
  const { isAuthenticated } = useAuth();
  function handleFilter() {}
  return (
    <ErrorBoundary
      fallback={<URLCardError />}
      key={isAuthenticated ? "authenticated" : "guest"}
    >
      <div className="w-full flex flex-col gap-y-6 mt-20">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <h3 className="text-[10px] text-theme uppercase font-bold tracking-widest whitespace-nowrap">
              Recent Activity
            </h3>
          </div>
          <hr className="w-full rounded-xl opacity-10" />
          <div className="cursor-pointer  transition-colors flex items-center gap-1 text-xs font-medium">
            <span className="text-theme">Sort</span>
            <Filter onClick={handleFilter} />
          </div>
        </div>

        <Suspense
          fallback={
            <div id="url-list" className="flex flex-col gap-y-3 mb-4">
              {Array.from({ length: 2 }).map(() => (
                <URLItemSkeleton key={Math.random()} />
              ))}
            </div>
          }
        >
          <URLItems perPage={PER_PAGE} order="desc" />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export function URLCardError() {
  return (
    <div className="glass flex flex-col items-center p-12 gap-8 text-center rounded-2xl">
      <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
        <Linkoff size={34} className="fill-primary" />
      </div>
      <div>
        <h2 className="text-theme text-xl font-bold">
          Couldn't Load Your Recent Links
        </h2>
        <p className="text-theme/60 text-sm mt-4 sm:w-2/3 m-auto">
          We encountered an issue retrieving your data. Please check your
          network connection and try again.
        </p>
      </div>
      <button
        className="flex items-center gap-x-2 px-10 py-3 text-white bg-primary rounded-md shadow-md"
        onClick={() => window.location.reload()}
      >
        <svg
          viewBox="0 -960 960 960"
          height="24px"
          width="24px"
          className="fill-white"
        >
          <path d="M480-192q-120 0-204-84t-84-204q0-120 84-204t204-84q65 0 120.5 27t95.5 72v-99h72v240H528v-72h131q-29-44-76-70t-103-26q-90 0-153 63t-63 153q0 90 63 153t153 63q84 0 144-55.5T693-456h74q-9 112-91 188t-196 76Z"></path>
        </svg>
        Refresh
      </button>
    </div>
  );
}
