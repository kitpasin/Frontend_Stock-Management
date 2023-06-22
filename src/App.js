import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from "./utils/PrivateRoutes";
import { Suspense } from 'react';
import './App.scss'; 

/* Component pages */
import ConfigPage from "./pages/config/config";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import NotFoundPage from "./pages/page404";
import ShowUIComponentPage from "./pages/showui/showui.js"; 
import { useSelector } from 'react-redux'; 
import GuestRoutes from './utils/guestRoutes';
import LangConfigPage from './pages/langconfig';
import AdminPage from './pages/admin/admin';
import BounceLoading from './components/ui/loading/bounce/bounce';
import SpawnLoading from './components/ui/loading/spawn/spawn';
import WebInfoPage from './pages/webinfo/webinfo';
import ProfileAdminPage from './pages/admin/profile/profile';
import ForgetPasswordPage from './pages/forgetpassword/forgetpassword';
import CategoryPage from './pages/category/category';
import PostPage from './pages/post/post';
import SlidePage from './pages/slide/slide';
import MenuPage from './pages/menu/menu';
import InboxPage from './pages/inbox/inbox';
import ResetPasswordPage from './pages/resetpassword/resetpassword';
import ProductsPage from './pages/products/ProductsPage';
import ProductsImportPage from './pages/products/ProductsImportPage';
import ProductsExportPage from './pages/products/ProductsExportPage';
import ExpirationPage from './pages/expiration/ExpirationPage';
import Suppliers from './pages/supplier/Suppliers';
import ProductCategory from './pages/productCategory/ProductCategory';
import Amount from './pages/amount/Amount';
import Vat from './pages/vat/Vat';
import CreateSupplier from './pages/supplier/createSupplier/CreateSupplier';
import StockPage from './pages/stock/StockPage';
import DefectivePage from './pages/defective/DefectivePage'
import ImportPage from './pages/import/ImportPage';
import ExportPage from './pages/export/ExportPage';
import DefectiveSearchPage from './pages/defective/DefectiveSearchPage';
import DefectiveExportPage from './pages/defective/DefectiveExportPage';

function App() {
  const pagesAllow = useSelector((state) => state.app.pages)
  const isDevMode = useSelector((state) => state.app.isDevMode)

  return (
    <Suspense>
      {/* Animetion loading */}
      <BounceLoading />
      <SpawnLoading />
      <Routes>
        <Route element={<PrivateRoutes />}>
          {<Route path="/" element={<Navigate to="/dashboard" />} />}
          {pagesAllow.dashboard && <Route path="/dashboard" element={<DashboardPage />} />}
          {pagesAllow.inbox && <Route path="inbox" element={<InboxPage />} />}
          {/* {pagesAllow.messages && <Route path="messages" element={<DashboardPage />} /> } */}
          {/* {pagesAllow.subscribe && <Route path="subscribe" element={<DashboardPage />} /> } */}
          {/* {pagesAllow.productcate && <Route path="productcate" element={<DashboardPage />} /> } */}
          {pagesAllow.products && <Route path="/products" element={<ProductsPage />} />}
          {pagesAllow.products && <Route path="/products/import" element={<ProductsImportPage />} />}
          {pagesAllow.products && <Route path="/products/export" element={<ProductsExportPage />} />}
          {pagesAllow.products && <Route path="/expiration" element={<ExpirationPage />} />}
          {pagesAllow.products && <Route path="/stock" element={<StockPage />} />}
          {pagesAllow.products && <Route path="/import" element={<ImportPage />} />}
          {pagesAllow.products && <Route path="/export" element={<ExportPage />} />}
          {pagesAllow.products && <Route path="/defective" element={<DefectivePage />} />}
          {pagesAllow.products && (
            <Route path="/defective/search" element={<DefectiveSearchPage />} />
          )}
          {pagesAllow.products && (
            <Route path="/defective/export" element={<DefectiveExportPage />} />
          )}
          {pagesAllow.slides && <Route path="slides" element={<SlidePage />} />}

          {pagesAllow.menu && <Route path="menu" element={<MenuPage />} />}
          {pagesAllow.category && <Route path="category" element={<CategoryPage />} />}
          {pagesAllow.posts && <Route path="posts" element={<PostPage />} />}
          {/* {pagesAllow.reports && <Route path="reports" element={<DashboardPage />} /> } */}
          {pagesAllow.webinfo && <Route path="webinfo" element={<WebInfoPage />} />}
          {pagesAllow.languages && <Route path="languages" element={<LangConfigPage />} />}
          {pagesAllow.configs && <Route path="configs" element={<ConfigPage />} />}
          {pagesAllow.profile && <Route path="profile" element={<ProfileAdminPage />} />}

          {/* Pages setting group */}
          {pagesAllow.suppliers && <Route path="suppliers" element={<Suppliers />} />}
          {pagesAllow.suppliers && <Route path="createsupplier" element={<CreateSupplier />} />}
          {pagesAllow.productcate && <Route path="productcate" element={<ProductCategory />} />}
          {pagesAllow.amount && <Route path="amount" element={<Amount />} />}
          {pagesAllow.vat && <Route path="vat" element={<Vat />} />}
          {pagesAllow.admins && <Route path="admins" element={<AdminPage />} />}

          {/* {isDevMode && <Route path="componentui" element={<ShowUIComponentPage />} /> } */}
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgetpassword" element={<ForgetPasswordPage />} />
          <Route path="resetpassword/:token" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}
export default App;


