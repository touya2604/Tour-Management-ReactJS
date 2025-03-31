import React, { useState, useEffect } from "react";
import Management from "../components/management";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie"; // Import Cookies để lấy token
import "../styles/information.scss";

const UserAccount = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    email: false,
    fullName: false,
    phone: false,
  });

  const token = Cookies.get("tokenUser");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        console.error("Không tìm thấy token!");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.data) {
          setUser(data.data);
        } else {
          console.error("API không trả về dữ liệu hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    console.log(user);
    try {
      const response = await fetch("http://localhost:3000/user/editInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Lưu thất bại!");

      setIsEditing({ email: false, fullName: false, phone: false });
      console.log("Lưu thành công:", user);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event, field) => {
    setUser((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div id="container-account">
      <Management user={user} />
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
                  value={user.email || ""}
                  onChange={(event) => handleChange(event, "email")}
                  disabled={!isEditing.email}
                />
                <button
                  type="button"
                  className="buttonEdit"
                  onClick={() => handleEdit("email")}
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
                  value={user.fullName || ""}
                  onChange={(event) => handleChange(event, "fullName")}
                  disabled={!isEditing.fullName}
                />
                <button
                  type="button"
                  className="buttonEdit"
                  onClick={() => handleEdit("fullName")}
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
                  value={user.phone || ""}
                  onChange={(event) => handleChange(event, "phone")}
                  disabled={!isEditing.phone}
                />
                <button
                  type="button"
                  className="buttonEdit"
                  onClick={() => handleEdit("phone")}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </form>
            </div>
            <div id="saveButton">
              <button type="button" onClick={handleSave}>
                <FontAwesomeIcon id="saveIcon" icon={faFloppyDisk} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
