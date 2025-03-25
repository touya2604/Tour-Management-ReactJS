import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import AvaUser from "../assets/images/avatar.jpg";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import "../styles/management.scss";
class Management extends React.Component {
  handleChangeMail = (event) => {
    console.log(event.target.value);
  };
  render() {
    return (
      <>
        <div id="container-account">
          <div id="left-bar">
            <div id="left-bar-top">
              <img id="avatar" src={AvaUser} alt="avatar" />
              <div id="info">
                <p>infor@gmail.com</p>
                <p>
                  Trạng thái: <span>Tốt</span>
                </p>
                {/* <p>Trạng thái: <span>{this.props.status}</span></p> */}
                <p>Quyền: Khách hàng</p>
                {/* <p>Quyền: <span>{this.props.role}</span></p> */}
              </div>
            </div>
            <hr />
            <div id="left-bar-bottom">
              <a href="hi">
                <FontAwesomeIcon icon={faUserLarge} />
                <span className="clickInfo">Thông tin tài khoản</span>
              </a>
              <hr />
              <a href="hi">
                <FontAwesomeIcon icon={faPlaneUp} />
                <span className="clickInfo">Lịch sử đặt tour</span>
              </a>
              <hr />
              <a href="hi">
                <FontAwesomeIcon icon={faUserMinus} />
                <span className="clickInfo">Xóa tài khoản</span>
              </a>
              <hr />
            </div>
          </div>
          <div id="right-bar">
            <h1 id="right-bar-top">Tài khoản</h1>
            <div id="right-bar-bottom">
              <div id="left">
                <form id="mail">
                  <label className="labelInfo">Email</label>
                  <br />
                  <input
                    id="mail-field"
                    className="info-field"
                    type="text"
                    value="info@gmail.com"
                    onChange={(event) => {
                      this.handleChangeMail(event);
                    }}
                  />
                  <button className="buttonEdit" type="submit">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </form>
                <form id="name">
                  <label className="labelInfo">Họ và tên</label>
                  <br />
                  <input
                    id="name-field"
                    className="info-field"
                    type="text"
                    value="Nguyễn Văn A"
                    onChange={(event) => {
                      this.handleChangeMail(event);
                    }}
                  />
                  <button className="buttonEdit" type="submit">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </form>
              </div>
              <div id="right">
                <form>
                  <br />
                  <button id="change-password">Đổi mật khẩu</button>
                </form>
                <form id="phone">
                  <label className="labelInfo">Số điện thoại</label>
                  <br />
                  <input
                    id="phone-field"
                    className="info-field"
                    type="text"
                    value="091234567"
                    onChange={(event) => {
                      this.handleChangeMail(event);
                    }}
                  />
                  <button className="buttonEdit" type="submit">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </form>
              </div>
              <div id="saveButton">
                <form>
                  <button type="submit">
                    <FontAwesomeIcon id="saveIcon" icon={faFloppyDisk} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Management;
