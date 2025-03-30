import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import LogIn from "./logIn";
import SignIn from "./signIn";
import UserAccount from "./user-account";
import UserHistory from "./client/user-history";
import Tour from "./tour";
import News from "./news";
import Cart from "./client/cart";
import Vouncher from "./vouncher";
import DeleteAcc from "./deleteAccount";
import TourDetail from "./tourdetail";
import Header from "../components/header";
import VouncherManage from "./admin/vounchermanage";
import TourManage from "./admin/tourmanage";
import UserTest from "../data/usertest";
import TourAdd from "./admin/touradd";
import TourUpdate from "./admin/tourupdate";
import VouncherAdd from "./admin/vouncheradd";
import VouncherUpdate from "./admin/vouncherupdate";
import * as systemConfig from "../config/system";
import UserManage from "./admin/customerManage";
import CategoryList from "./CategoryList";
import TourDanhMuc from "./tourDanhMuc";
import History from "./client/user-history";
import CategoryAdd from "./admin/cateAdd";
import CategoryUpdate from "./admin/cateUpdate";

const App = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  // const [role, setRole] = useState(localStorage.getItem("role") || "");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/info");

        if (!response.ok) throw new Error("Lỗi khi lấy thong tin account");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        setUser(UserTest);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    if (user[0] && user[0].role) {
      setRole(user[0].role);
    }
  }, [user]);
  if (loading) {
    return <div className="loading">Đang tải giao diện người dùng...</div>;
  }
  // useEffect(() => {
  //   const savedRole = localStorage.getItem("role");
  //   if (savedRole) setUser(savedRole);
  // }, []);
  return (
    <Router>
      <Header checkLog={role} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logIn" element={<LogIn setUser={setUser} />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="/user-account"
          element={<UserAccount userCheck={user[0]} />}
        />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/user-delete" element={<DeleteAcc />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/newsletter" element={<News />} />
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
        <Route path="/tourDanhMuc/:slug" element={<TourDanhMuc />} />

        <Route
          path={`${systemConfig.prefixAdmin}/tour-manage`}
          element={<TourManage></TourManage>}
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
        <Route path={`/order`} element={<History />} />
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
