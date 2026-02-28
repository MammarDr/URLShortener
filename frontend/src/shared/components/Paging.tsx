import SkipNext from "./icons/SkipNext";
import SkipPrev from "./icons/SkipPrev";
import Next from "./icons/Next";
import Prev from "./icons/Prev";
import {
  setCurrentPage,
  incrementCurrentPage,
  decrementCurrentPage,
} from "../../features/url/store/urlSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Paging({
  currentPage,
  perPage,
  totalPages,
  totalElements,
}: {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalElements: number;
}) {
  if (totalPages <= 1) return <></>;
  const dispatch = useDispatch();
  const spanStyle = `text-theme hover:bg-theme/5 text-sm w-10 h-10 place-items-center rounded-xl`;

  return (
    <div className="w-fit flex items-center p-2 gap-2.5 glass rounded-xl shadow-lg">
      <button
        className={`${spanStyle} ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
        onClick={() => dispatch(setCurrentPage(1))}
      >
        <SkipPrev />
      </button>
      <button
        className={`${spanStyle} ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
        onClick={() => dispatch(decrementCurrentPage({ by: 1, min: 1 }))}
      >
        <Prev />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          className={`${spanStyle} ${currentPage === i + 1 ? "!bg-primary !hover:bg-primary text-white " : ""}`}
          key={i}
          onClick={() => dispatch(setCurrentPage(i + 1))}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={`${spanStyle} ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
        onClick={() =>
          dispatch(incrementCurrentPage({ by: 1, max: totalPages }))
        }
      >
        <Next />
      </button>
      <button
        className={`${spanStyle} ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
        onClick={() => dispatch(setCurrentPage(totalPages))}
      >
        <SkipNext />
      </button>
    </div>
  );
}
