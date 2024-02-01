import { BrowserRouter } from "react-router-dom";

import MainPageRoutes from "./MainPageRoutes";

//Contains Browser Router containing from top to bottom the routes for the Header, Main Page, and Footer
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainPageRoutes />
    </BrowserRouter>
  );
}
