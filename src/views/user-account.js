import React from "react";
import Header from "../components/header";
import Management from "../components/management";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import "../styles/management.scss";

class UserAccount extends React.Component {
  render() {
    let { checkAcc } = this.props;
    return (
      <>
        <Header checkLog={checkAcc}></Header>
        <div id="container-account">
          <Management checkAcc={checkAcc} />
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
export default UserAccount;
