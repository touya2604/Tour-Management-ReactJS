import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import LogIn from "./logIn";
import SignIn from "./signIn";
import UserAccount from "./user-account";
import UserHistory from "./client/payment.js";
import Tour from "./tour";
import Cart from "./client/cart";
import Vouncher from "./vouncher";
import DeleteAcc from "./deleteAccount";
import TourDetail from "./tourdetail";
import Header from "../components/header";
import VouncherManage from "./admin/vounchermanage";
import TourManage from "./admin/tourmanage";
import TourAdd from "./admin/touradd";
import TourUpdate from "./admin/tourupdate";
import VouncherAdd from "./admin/vouncheradd";
import VouncherUpdate from "./admin/vouncherupdate";
import * as systemConfig from "../config/system";
import UserManage from "./admin/customerManage";
import CategoryList from "./CategoryList";
import TourDanhMuc from "./tourDanhMuc";
import CategoryAdd from "./admin/cateAdd";
import CategoryUpdate from "./admin/cateUpdate";
import OrderDetails from "./orderDetail";
import Payment from "./client/payment.js";
import CategoryListCustomer from "./client/categories.js";
import History from "./orderHistory.js";
import UserTest from "../data/usertest.js";
const App = () => {
  // const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [role, setRole] = useState(UserTest[0].role);
  return (
    <Router>
      <Header checkLog={role || "customer"} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logIn" element={<LogIn setRole={setRole} />} />
        <Route path="/signIn" element={<SignIn setRole={setRole} />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/user-delete" element={<DeleteAcc />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/cart" element={<Cart role={role} />} />
        <Route path="/vouncher" element={<Vouncher />} />
        <Route path="/tour/detail/:slug" element={<TourDetail />} />
        <Route
          path={`${systemConfig.prefixAdmin}/vouchers`}
          element={<VouncherManage />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/customers`}
          element={<UserManage />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/categories`}
          element={<CategoryList />}
        />
        <Route path="/categories" element={<CategoryListCustomer />} />
        <Route path="/tourDanhMuc/:title" element={<TourDanhMuc />} />
        <Route
          path={`${systemConfig.prefixAdmin}/tour-manage`}
          element={<TourManage />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/tour-add`}
          element={<TourAdd />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/tour-update/:slug`}
          element={<TourUpdate />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/voucher-add`}
          element={<VouncherAdd />}
        />
        <Route path="/order" element={<Payment />} />
        <Route path="/orderDetail" element={<OrderDetails />} />
        <Route path="/ordersHistory" element={<History />} />
        <Route
          path={`${systemConfig.prefixAdmin}/voucher-update/:id`}
          element={<VouncherUpdate />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/cates-add`}
          element={<CategoryAdd />}
        />
        <Route
          path={`${systemConfig.prefixAdmin}/cates-upd/:slug`}
          element={<CategoryUpdate />}
        />
      </Routes>
    </Router>
  );
};

export default App;
