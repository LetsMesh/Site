import { BrowserRouter } from "react-router-dom";
import HeaderRoutes from "./HeaderRoutes";
import FooterRoutes from "./FooterRoutes";
import MainPageRoutes from "./MainPageRoutes";

//Contains Browser Router containing from top to bottom the routes for the Header, Main Page, and Footer
export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/*Header Routes*/}
      <HeaderRoutes />
      {/*Main Page Routes*/}
      <MainPageRoutes />
      {/*Footer Routes*/}
      <FooterRoutes />
    </BrowserRouter>
  );
}
