import React from "react";
import logoHead from "../assets/images/logoHead.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
class Header extends React.Component {
  render() {
    let { checkLog } = this.props;
    return (
      <div className="container-header">
        <div className="container-header-img">
          <img className="image-header" src={logoHead} alt="logoHeader" />
        </div>
        <nav className="nav-header">
          <a href="hi" id="homepage">
            Trang chủ
          </a>
          <a href="hi">Tour du lịch</a>
          <a href="hi">Tin tức</a>
          {checkLog === "1" ? (
            <a href="hi">Quản lý doanh thu</a>
          ) : (
            <a href="hi">Liên hệ</a>
          )}
          {checkLog === "1" ? (
            <a href="hi">Quản lý vouncher</a>
          ) : (
            <a href="hi">Mã giảm giá</a>
          )}
          {checkLog === "1" ? (
            <a href="hi">Quản lý tour</a>
          ) : (
            <a href="hi">Giỏ hàng</a>
          )}
          {(checkLog === "0") | (checkLog === "1") ? (
            <a href="hi">
              <FontAwesomeIcon icon={faUserLarge} /> Tài khoản
            </a>
          ) : (
            <>
              <a href="hi" className="inOut">
                Đăng nhập
              </a>
              <a href="hi" className="inOut">
                Đăng ký
              </a>
            </>
          )}
        </nav>
      </div>
    );
  }
}
export default Header;
