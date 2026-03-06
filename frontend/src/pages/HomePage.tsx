import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import URLInput from "../features/url/components/URLInput";
import URLCard from "../features/url/components/URLCard";
import { toast } from "../shared/toast/toasts";
import type { RootState } from "../app/store";
export default function HomePage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      toast.success("Url Shortener", "Welcome to my website");
      toast.info("Authenticate", "Login to access all features.");
    }
  }, []);

  return (
    <main className="w-[min(900px,90%)] pt-[5vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center gap-y-5 my-10">
        <h1 className="text-[clamp(1.8rem,calc(7vw+1rem),5rem)]  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-600 tracking-tight">
          Simplify Your Links
        </h1>
        <span className="text-[clamp(1rem,calc(0.75vw+0.25rem),1.25rem)] text-theme">
          Shorten, track, and manage your URLs with a productivity-focused
          dashboard designed for speed.
        </span>
      </div>
      <div className="w-full space-y-16">
        <URLInput />
        <URLCard />
      </div>
      <Outlet />
      <footer className="mt-10"></footer>
    </main>
  );
}
