import Light from "../../shared/components/icons/Light";
import Dark from "../../shared/components/icons/Dark";
import { useDispatch } from "react-redux";
import { toggleTheme } from "./themeSlice";
import { useTheme } from "../../shared/hooks/useTheme";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { color } = useTheme();
  return (
    <div
      onClick={() => dispatch(toggleTheme())}
      className="fixed z-50 p-3.5 bottom-10 right-5 glass rounded-full flex items-center justify-center shadow-lg  hover:scale-[1.05] transition-all cursor-pointer"
    >
      {color === "light" ? <Light size={24} /> : <Dark size={24} />}
    </div>
  );
}
