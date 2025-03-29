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

const App = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  // const [role, setRole] = useState(localStorage.getItem("role") || "");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user-info");

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
        <Route path="/tour-detail/:id" element={<TourDetail />} />
        <Route path="/voucher-manage" element={<VouncherManage />} />
        <Route path="/tour-manage" element={<TourManage></TourManage>} />
        <Route path="/tour-add" element={<TourAdd />} />
        <Route path="/tour-update/:id" element={<TourUpdate />} />
        <Route path="/vouncher-add" element={<VouncherAdd />} />
        <Route path="/vouncher-update/:id" element={<VouncherUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
