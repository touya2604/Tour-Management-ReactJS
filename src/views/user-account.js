import React from "react";
import Header from "../components/header";
import Management from "../components/management";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "../styles/information.scss";

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "info@gmail.com",
      fullName: "Nguyễn Văn A",
      phone: "091234567",
      status: "Tốt",
      role: "Khách hàng",
      isEditing: {
        email: false,
        fullName: false,
        phone: false,
      },
      savedUser: {
        email: "info@gmail.com",
        fullName: "Nguyễn Văn A",
        phone: "091234567",
        status: "Tốt",
        role: "Khách hàng",
      },
    };
  }

  handleEdit = (field) => {
    this.setState((prevState) => ({
      isEditing: {
        ...prevState.isEditing,
        [field]: true,
      },
    }));
  };

  handleSave = () => {
    this.setState((prevState) => ({
      isEditing: { email: false, fullName: false, phone: false },
      savedUser: {
        email: prevState.email,
        fullName: prevState.fullName,
        phone: prevState.phone,
        status: prevState.status,
        role: prevState.role,
      },
    }));
    console.log("Lưu thành công:", this.state);
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  render() {
    let { checkAcc } = this.props;
    return (
      <>
        <Header checkLog={checkAcc} />
        <div id="container-account">
          <Management user={this.state.savedUser} />
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
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event, "email")}
                    disabled={!this.state.isEditing.email}
                  />
                  <button
                    type="button"
                    className="buttonEdit"
                    onClick={() => this.handleEdit("email")}
                  >
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
                    value={this.state.fullName}
                    onChange={(event) => this.handleChange(event, "fullName")}
                    disabled={!this.state.isEditing.fullName}
                  />
                  <button
                    type="button"
                    className="buttonEdit"
                    onClick={() => this.handleEdit("fullName")}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </form>
              </div>
              <div id="right">
                <br />
                <button id="change-password">Đổi mật khẩu</button>
                <form id="phone">
                  <label className="labelInfo">Số điện thoại</label>
                  <br />
                  <input
                    id="phone-field"
                    className="info-field"
                    type="text"
                    value={this.state.phone}
                    onChange={(event) => this.handleChange(event, "phone")}
                    disabled={!this.state.isEditing.phone}
                  />
                  <button
                    type="button"
                    className="buttonEdit"
                    onClick={() => this.handleEdit("phone")}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </form>
              </div>
              <div id="saveButton">
                <button type="button" onClick={this.handleSave}>
                  <FontAwesomeIcon id="saveIcon" icon={faFloppyDisk} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserAccount;
