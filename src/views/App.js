import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import LogIn from "./logIn";
import SignIn from "./signIn";
import UserAccount from "./user-account";
import UserHistory from "./user-history";
import Tour from "./tour";
import News from "./news";
import Cart from "./cart";
import Vouncher from "./vouncher";
import DeleteAcc from "./deleteAccount";
import TourDetail from "./tourdetail";
import Header from "../components/header";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  return (
    <Router>
      <Header checkLog={role} />
      <Routes>
        <Route path="/" element={<HomePage checkAcc={role} />} />
        <Route path="/logIn" element={<LogIn setRole={setRole} />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/user-account" element={<UserAccount checkAcc={role} />} />
        <Route path="/user-history" element={<UserHistory checkAcc={role} />} />
        <Route path="/user-delete" element={<DeleteAcc checkAcc={role} />} />
        <Route path="/tour" element={<Tour checkAcc={role} />} />
        <Route path="/newsletter" element={<News checkAcc={role} />} />
        <Route path="/cart" element={<Cart checkAcc={role} />} />
        <Route path="/vouncher" element={<Vouncher checkAcc={role} />} />
        <Route
          path="/tour-detail/:id"
          element={<TourDetail checkAcc={role} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
