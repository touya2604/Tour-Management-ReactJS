import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import AvaUser from "../assets/images/avatar.jpg";
import "../styles/management.scss";
class Management extends React.Component {
  handleChangeMail = (event) => {
    console.log(event.target.value);
  };
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default Management;
