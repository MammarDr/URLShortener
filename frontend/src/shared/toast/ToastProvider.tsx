import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { Toast } from "./toastSlice";
import { useEffect } from "react";
import Correct from "../../shared/components/icons/Correct";
import Wrong from "../../shared/components/icons/Wrong";
import Alert from "../../shared/components/icons/Alert";
import Info from "../../shared/components/icons/Info";
import { remove } from "./toastSlice";

export default function ToastProvider() {
  const toast: Toast[] = useSelector((state: RootState) => state.toast);
  debugger;
  return (
    <div className="flex flex-col gap-2 absolute top-28 right-16 z-[999]">
      {toast.map((t: Toast) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}

const TYPES = {
  success: {
    icon: <Correct size={24} className="fill-green-400 dark:fill-green-600" />,
    className: "bg-green-100 dark:bg-green-500/20",
  },
  error: {
    icon: <Wrong size={24} className="fill-red-400 dark:fill-red-600" />,
    className: "bg-red-100 dark:bg-red-500/20",
  },
  alert: {
    icon: <Alert size={24} className="fill-yellow-400 dark:fill-yellow-600" />,
    className: "bg-yellow-100 dark:bg-yellow-500/20",
  },
  info: {
    icon: <Info size={24} className="fill-blue-400 dark:fill-blue-600" />,
    className: "bg-blue-100 dark:bg-blue-500/20",
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const dispatch = useDispatch();
  const { icon, className } = TYPES[toast.type];
  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(remove(toast.id)),
      toast.duration,
    );
    return () => clearTimeout(timeout);
  });
  return (
    <div className="glass flex items-center w-96 p-4 rounded-2xl text-ms shadow-md">
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center rounded-full w-8 h-8 ${className}`}
        >
          {icon}
        </span>
        <div>
          <h2 className="text-sm font-bold tracking-tighter text-theme">
            {toast.title}
          </h2>
          <p className="text-xs text-theme/80">{toast.message}</p>
        </div>
      </div>
      <svg
        viewBox="0 -960 960 960"
        height="20px"
        width="20px"
        className="cursor-pointer fill-theme/50 hover:fill-theme/100 ml-auto"
        onClick={() => dispatch(remove(toast.id))}
      >
        <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
      </svg>
    </div>
  );
}
