import Copy from "../../../shared/components/icons/Copy.tsx";
import Edit from "../../../shared/components/icons/Edit.tsx";
import Delete from "../../../shared/components/icons/Delete.tsx";
import Link from "../../../shared/components/icons/Link.tsx";
import Linkoff from "../../../shared/components/icons/Linkoff.tsx";
import Dot from "../../../shared/components/icons/Dot.tsx";
import type { IUrl } from "../types.ts";
import { useEffect, useState } from "react";
import { sanitizeUrl } from "../utils/sanitizeUrl.ts";
import extendUrl from "../utils/extendUrl.ts";
import formatNumber from "../utils/formatNumber.ts";
export default function URLItem({
  url,
  isDeleting,
  onDelete,
}: {
  url: IUrl;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 600);

  useEffect(() => {
    const handleResize = () => setIsBigScreen(window.innerWidth > 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shortUrl = window.location.origin + "/" + url.shortCode;
  const headElement = url.isActive ? (
    <span className="bg-orange-100 dark:bg-[#4314074d] p-2 rounded-xl">
      <Link size={24} className="fill-[#ffa500]" />
    </span>
  ) : (
    <span className="bg-gray-100 dark:bg-[#16161640] p-2 rounded-xl">
      <Linkoff size={24} className="fill-[#94a3b8]" />
    </span>
  );

  const statusElement = url.isActive ? (
    <div className=" bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-semibold text-[10px] py-0.5 px-1.5 rounded-lg">
      ACTIVE
    </div>
  ) : (
    <div className="bg-gray-700 text-stone-100 font-semibold text-[10px] py-0.5 px-1.5 rounded-lg">
      ARCHIVED
    </div>
  );

  function handleClick() {
    navigator.clipboard.writeText(shortUrl);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  }

  function handleEdit() {}

  function handleRmove() {
    onDelete(url.id);
  }

  return (
    <div
      id={url.id}
      className={`w-full px-6 py-6 flex items-center justify-between glass rounded-xl hover:opacity-100 group ${isDeleting && "transition-all duration-300 opacity-50 scale-95 pointer-events-none"}`}
    >
      <div className="flex gap-3 w-5/6">
        <div className="flex items-center">{headElement}</div>
        <div className="w-full space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm text-theme mr-1">{sanitizeUrl(shortUrl)}</p>
            {statusElement}
            <div className="bg-gray-200 text-stone-800 text-[10px] py-0.5 px-1.5 rounded-lg">
              {formatNumber(url.visitCount)} views
            </div>
          </div>
          <div className="w-1/4 text-[11px] text-theme/50 truncate">
            <a
              href={extendUrl(url.source)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {sanitizeUrl(url.source)}
            </a>
          </div>
        </div>
      </div>

      {isBigScreen ? (
        <div className="flex gap-3 items-center opacity-60 group-hover:opacity-100 transition-opacity">
          <label
            className="relative cursor-pointer"
            title="Copy"
            onClick={handleClick}
          >
            <Copy className="fill-slate-700/80 dark:fill-zinc-500 pointer-events-none" />
            {showCopied && (
              <div className="animate-[fade-in-bck_0.6s_cubic-bezier(0.39,0.575,0.565,1)_both] absolute glass p-2 bottom-7 left-[-20px] text-[10px] rounded-xl dark:text-stone-200 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-400 dark:after:border-t-gray-700">
                Copied!
              </div>
            )}
          </label>
          <label className="cursor-pointer" title="Edit" onClick={handleEdit}>
            <Edit className="fill-slate-700/80 dark:fill-zinc-500 pointer-events-none" />
          </label>
          <div className="h-5 p-[0.25px] bg-theme/20"></div>
          <label
            onClick={handleRmove}
            title="Delete"
            className="rounded-md p-1 fill-slate-400 hover:fill-red-500 hover:bg-red-500/10 cursor-pointer"
          >
            <Delete className="pointer-events-none" />
          </label>
        </div>
      ) : (
        <Dot onClick={handleEdit} />
      )}
    </div>
  );
}

export const URLItemSkeleton = () => {
  return (
    <>
      <div className="glass w-full px-6 py-6 flex items-center justify-between rounded-xl">
        <div className="flex gap-3 w-5/6 animate-pulse">
          <div className="flex items-center">
            <div className="bg-gray-200 dark:bg-gray-400 rounded-full h-10 w-10"></div>
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 dark:bg-gray-400 rounded h-4 w-24"></div>
              <div className="bg-gray-200 dark:bg-gray-400 rounded h-4 w-16"></div>
              <div className="bg-gray-200 dark:bg-gray-400 text-stone-800 text-[10px] py-0.5 px-1.5 rounded-lg h-4 w-20"></div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-400 rounded h-4 w-1/4"></div>
          </div>
        </div>
        <div className="flex gap-2 opacity-80 animate-pulse">
          <div className="bg-gray-200  dark:bg-gray-400 h-5 w-8 rounded-xl"></div>
          <div className="bg-gray-200  dark:bg-gray-400 h-5 w-8 rounded-xl"></div>
          <div className="bg-gray-200  dark:bg-gray-400 h-5 w-8 rounded-xl"></div>
        </div>
      </div>
    </>
  );
};
