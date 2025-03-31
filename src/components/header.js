import React from "react";
import { useNavigate } from "react-router-dom";
import logoHead from "../assets/images/logoHead.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";
import * as systemConfig from "../config/system";

const Header = ({ checkLog }) => {
  const navigate = useNavigate();
  const role = checkLog || localStorage.getItem("role") || "";

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container-header">
      <div className="container-header-img">
        <img className="image-header" src={logoHead} alt="logoHeader" />
      </div>
      <nav className="nav-header">
        <button onClick={() => navigate("/")}>Trang chủ</button>
        <button onClick={() => navigate("/tour")}>Tour du lịch</button>

        {role === "admin" ? (
          <button
            onClick={() => navigate(`${systemConfig.prefixAdmin}/categories`)}
          >
            Quản lý danh mục
          </button>
        ) : (
          <button onClick={() => navigate("/categories")}>Danh mục</button>
        )}

        {/* {role === "admin" && (
          <button onClick={() => navigate("/revenue")}>
            Quản lý doanh thu
          </button>
        )} */}

        {role === "admin" ? (
          <button
            onClick={() => navigate(`${systemConfig.prefixAdmin}/vouchers`)}
          >
            Quản lý vouncher
          </button>
        ) : (
          <button onClick={() => navigate("/vouncher")}>Mã giảm giá</button>
        )}

        {role === "admin" && <button>Quản lý đơn hàng</button>}

        {role === "admin" && (
          <button
            onClick={() => navigate(`${systemConfig.prefixAdmin}/customers`)}
          >
            Quản lý tài khoản
          </button>
        )}

        {role === "admin" ? (
          <button
            onClick={() => navigate(`${systemConfig.prefixAdmin}/tour-manage`)}
          >
            Quản lý tour
          </button>
        ) : (
          <button onClick={() => navigate("/cart")}>Giỏ hàng</button>
        )}

        {(role === "admin" || role === "customer") && (
          <button onClick={() => navigate("/payment")}>Thanh toán</button>
        )}

        {role === "customer" && (
          <button onClick={() => navigate("/ordersHistory")}>
            Lịch sử đơn hàng
          </button>
        )}

        {role === "customer" || role === "admin" ? (
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
            <button onClick={() => navigate("/logIn")} className="inOut">
              Đăng nhập
            </button>
            <button onClick={() => navigate("/signIn")} className="inOut">
              Đăng ký
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
