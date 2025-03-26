import React from "react";
import { useNavigate } from "react-router-dom";
import logoHead from "../assets/images/logoHead.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";

const Header = ({ checkLog }) => {
  const navigate = useNavigate();

  return (
    <div className="container-header">
      <div className="container-header-img">
        <img className="image-header" src={logoHead} alt="logoHeader" />
      </div>
      <nav className="nav-header">
        <button onClick={() => navigate("/")}>Trang chủ</button>
        <button onClick={() => navigate("/tour")}>Tour du lịch</button>
        <button onClick={() => navigate("/newsletter")}>Tin tức</button>
        {checkLog === "1" ? (
          <button onClick={() => navigate("/revenue")}>
            Quản lý doanh thu
          </button>
        ) : (
          <button onClick={() => navigate("/contact")}>Liên hệ</button>
        )}
        {checkLog === "1" ? (
          <button onClick={() => navigate("/voucher")}>Quản lý vouncher</button>
        ) : (
          <button onClick={() => navigate("/vouncher")}>Mã giảm giá</button>
        )}
        {checkLog === "1" ? (
          <button onClick={() => navigate("/tour")}>Quản lý tour</button>
        ) : (
          <button onClick={() => navigate("/cart")}>Giỏ hàng</button>
        )}
        {(checkLog === "0") | (checkLog === "1") ? (
          <button onClick={() => navigate("/user-account")}>
            {" "}
            <FontAwesomeIcon icon={faUserLarge} /> Tài khoản{" "}
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="inOut">
              Đăng nhập
            </button>
            <button onClick={() => navigate("/signin")} className="inOut">
              Đăng ký
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
