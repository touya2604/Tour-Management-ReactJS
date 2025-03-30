import React, { useState, useEffect } from "react";
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

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedEmail = localStorage.getItem("userEmail");
        if (!savedEmail) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000");
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách khách hàng");

        const data = await response.json();
        const foundUser = data.data.find((u) => u.email === savedEmail);

        if (foundUser) {
          setUser(foundUser);
          setRole(foundUser.role);
          localStorage.setItem("role", foundUser.role);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải giao diện người dùng...</div>;
  }

  return (
    <Router>
      <Header checkLog={"customer"} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/logIn"
          element={<LogIn setUser={setUser} setRole={setRole} />}
        />
        <Route
          path="/signIn"
          element={<SignIn setUser={setUser} setRole={setRole} />}
        />
        <Route
          path="/user-account"
          element={<UserAccount userCheck={user} />}
        />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/user-delete" element={<DeleteAcc />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/cart" element={<Cart />} />
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
