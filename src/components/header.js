import React from "react";
import logoHead from "../assets/images/logoHead.png";
class Header extends React.Component {
  render() {
    return (
      <div className="container-header">
        <div className="container-header-img">
          <img className="image-header" src={logoHead} alt="logoHeader" />
        </div>
        <nav className="nav-header">
          <a href="hi">Trang chủ</a>
          <a href="hi">Tour du lịch</a>
          <a href="hi">Tin tức</a>
          <a href="hi">Liên hệ</a>
          <a href="hi">Mã giảm giá</a>
          <a href="hi">Giỏ hàng</a>
          <a href="hi" className="inOut">
            Đăng nhập
          </a>
          <a href="hi" className="inOut">
            Đăng ký
          </a>
        </nav>
      </div>
    );
  }
}
export default Header;
