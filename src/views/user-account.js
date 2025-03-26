import React, { Component } from "react";
import Management from "../components/management";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "../styles/information.scss";

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      phone: "",
      status: "",
      role: "",
      isLoading: true,
      isEditing: {
        email: false,
        fullName: false,
        phone: false,
      },
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const response = await fetch("https://api.example.com/user-info"); // Thay API của ô vào
      const data = await response.json();
      this.setState({
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        status: data.status,
        role: data.role,
        isLoading: false,
      });
    } catch (error) {
      console.error("Lỗi khi tải thông tin người dùng:", error);
      this.setState({ isLoading: false });
    }
  };

  handleEdit = (field) => {
    this.setState((prevState) => ({
      isEditing: {
        ...prevState.isEditing,
        [field]: true,
      },
    }));
  };

  handleSave = async () => {
    const { email, fullName, phone } = this.state;
    try {
      const response = await fetch("https://api.example.com/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, phone }),
      });

      if (!response.ok) throw new Error("Lưu thất bại!");

      this.setState({
        isEditing: { email: false, fullName: false, phone: false },
      });
      console.log("Lưu thành công:", { email, fullName, phone });
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
    }
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  render() {
    const { email, fullName, phone, status, role, isEditing, isLoading } =
      this.state;

    return (
      <>
        <div id="container-account">
          <Management user={{ email, status, role }} />
          <div id="right-bar">
            <h1 id="right-bar-top">Tài khoản</h1>
            {isLoading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div id="right-bar-bottom">
                <div id="left">
                  <form id="mail">
                    <label className="labelInfo">Email</label>
                    <br />
                    <input
                      id="mail-field"
                      className="info-field"
                      type="text"
                      value={email}
                      onChange={(event) => this.handleChange(event, "email")}
                      disabled={!isEditing.email}
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
                      value={fullName}
                      onChange={(event) => this.handleChange(event, "fullName")}
                      disabled={!isEditing.fullName}
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
                      value={phone}
                      onChange={(event) => this.handleChange(event, "phone")}
                      disabled={!isEditing.phone}
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
            )}
          </div>
        </div>
      </>
    );
  }
}

export default UserAccount;
