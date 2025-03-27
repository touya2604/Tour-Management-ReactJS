import React from "react";
import { useNavigate } from "react-router-dom";
import logoHead from "../assets/images/logoHead.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";

const Header = ({ checkLog }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload(); // Reload trang để cập nhật giao diện
  };

  return (
    <div className="container-header">
      {console.log(checkLog)}
      <div className="container-header-img">
        <img className="image-header" src={logoHead} alt="logoHeader" />
      </div>
      <nav className="nav-header">
        <button onClick={() => navigate("/")}>Trang chủ</button>
        <button onClick={() => navigate("/tour")}>Tour du lịch</button>
        <button onClick={() => navigate("/newsletter")}>Tin tức</button>
        {checkLog === "1" && (
          <button onClick={() => navigate("/revenue")}>
            Quản lý doanh thu
          </button>
        )}
        {checkLog === "1" ? (
          <button onClick={() => navigate("/voucher-manage")}>
            Quản lý vouncher
          </button>
        ) : (
          <button onClick={() => navigate("/vouncher")}>Mã giảm giá</button>
        )}
        {checkLog === "1" ? (
          <button onClick={() => navigate("/tour-manage")}>Quản lý tour</button>
        ) : (
          <button onClick={() => navigate("/cart")}>Giỏ hàng</button>
        )}
        {checkLog === "0" || checkLog === "1" ? (
          <>
            <button onClick={() => navigate("/user-account")}>
              <FontAwesomeIcon icon={faUserLarge} /> Tài khoản
            </button>
            <button onClick={handleLogout} className="inOut">
              Đăng xuất
            </button>
          </>
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
