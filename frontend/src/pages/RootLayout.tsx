import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header";
import ThemeToggle from "../features/theme/ThemeToggle";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <ThemeToggle />
    </>
  );
}
