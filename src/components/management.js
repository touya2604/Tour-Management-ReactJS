import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import AvaUser from "../assets/images/avatar.jpg";
import "../styles/management.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Management = () => {
  const [user, setUser] = React.useState({});
  let navigate = useNavigate();
  const token = Cookies.get("tokenUser");
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/info`, {
          // đổi IP nếu cần
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug response

        if (data && data.data) {
          setUser(data.data);
        } else {
          console.error("Lỗi: API không trả về dữ liệu hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      }
    };

    if (token) {
      fetchTours();
    } else {
      console.error("Không tìm thấy token!");
    }
  }, [token]);

  return (
    <>
      <div id="left-bar">
        <div id="left-bar-top">
          <img id="avatar" src={AvaUser} alt="avatar" />
          <div id="info">
            <p>{user.email || "Chưa có email"}</p>
          </div>
        </div>
        <hr />
        <div id="left-bar-bottom">
          <button onClick={() => navigate("/user-account")}>
            <FontAwesomeIcon icon={faUserLarge} />
            <span className="clickInfo">Thông tin tài khoản</span>
          </button>
          <hr />
          <button onClick={() => navigate("/user-delete")}>
            <FontAwesomeIcon icon={faUserMinus} />
            <span className="clickInfo">Xóa tài khoản</span>
          </button>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Management;
