import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export function useTheme() {
  return useSelector((state: RootState) => state.theme);
}
