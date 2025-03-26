import React from "react";
import logoFoot from "../assets/images/logoFoot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons"; // Import icon
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../styles/footer.scss";
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container-footer">
          <div id="image-icon">
            <div id="image-footer">
              <img src={logoFoot} alt="LogoFooter" />
            </div>
            <div id="icon-footer">
              <FontAwesomeIcon className="icon" icon={faFacebook} />
              <FontAwesomeIcon className="icon" icon={faInstagram} />
              <FontAwesomeIcon className="icon" icon={faYoutube} />
            </div>
          </div>
          <div id="infor-footer">
            <div className="block" id="category">
              <p className="Tieude">Thông tin</p>
              <ul className="list-item">
                <li>Giới thiệu</li>
                <li>Tin tức</li>
              </ul>
            </div>
            <div className="block" id="contact">
              <p className="Tieude">Địa điểm du lịch</p>
              <div id="TinhDuLich">
                <ul className="list-item">
                  <li>Hà Nội</li>
                  <li>Hạ Long</li>
                  <li>Đà Nẵng</li>
                  <li>Nha Trang</li>
                  <li>Phú Quốc</li>
                  <li>Quy Nhơn</li>
                </ul>
                <ul className="list-item">
                  <li>Huế</li>
                  <li>Quảng Bình</li>
                  <li>Quảng Nam</li>
                  <li>Đà Lạt</li>
                  <li>Hà Giang</li>
                  <li>Côn Đảo</li>
                </ul>
              </div>
            </div>
            <div className="block" id="information">
              <p className="Tieude">Liên hệ</p>
              <p>Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội</p>
              <p> +(84) 23 456 789</p>
              <p> +(84) 98 765 432</p>
              <p> info@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
