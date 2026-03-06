import Link from "../../../shared/components/icons/Link";
import Bolt from "../../../shared/components/icons/Bolt";
import { useMutation } from "@tanstack/react-query";
import { createUrl } from "../api/urlApi";
import { displayError, toast } from "../../../shared/toast/toasts";
import queryClient from "../../../app/queryClient";
import { useAuth } from "../../auth/hooks/useAuth";
import type { ICreateUrlDTO } from "../types";
import { insertAndshiftPaginatedCache } from "../utils/queryHelpers";
import { useState } from "react";

export default function URLInput() {
  const { isAuthenticated } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const urlMutation = useMutation({
    mutationFn: (variables: ICreateUrlDTO) => createUrl(variables),
    onSuccess: async (response) => {
      const invalidateCaches = insertAndshiftPaginatedCache(
        queryClient,
        ["urls", isAuthenticated],
        response.data,
      );

      navigator.clipboard
        .writeText(window.location.origin + "/" + response.data.shortCode)
        .then(() => toast.success("URL Created", "Copied to clipboard."))
        .catch(() => toast.success("URL Created", "Copy it and share it !"));

      for (const queryKey of invalidateCaches) {
        await queryClient.cancelQueries({ queryKey, exact: true });
        queryClient.invalidateQueries({ queryKey, exact: true });
      }
    },
    onError: (error) => displayError(error),
  });

  function handleUrlCreation(e: React.SubmitEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    setInputValue("");
    urlMutation.mutate({ source: url, title: "Shortened Url", active: true });
  }

  return (
    <div className="w-full p-4 glass rounded-3xl">
      <form
        onSubmit={handleUrlCreation}
        className="flex items-center justify-between glass rounded-lg border-theme border-[0.5px] shadow-[rgba(0,0,0,0.04)_0px_3px_5px]"
      >
        <div className="w-full flex items-center justify-between py-4 mx-6 max-sm:mx-2">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            name="url"
            id="url"
            autoComplete="off"
            className="w-full pl-10 text-theme placeholder:text-inherit/20 focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Link
            size={24}
            className="absolute left-6 max-sm:left-4 fill-theme/60 pointer-events-none"
          />

          <button
            className="flex text-white items-center gap-1 text-sm bg-primary hover:bg-orange-600 font-semibold rounded-lg px-8 py-4 max-sm:px-4 transition-all"
            type="submit"
          >
            Shorten
            <span>
              <Bolt size={16} />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
