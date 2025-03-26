import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserLarge,
  faPlaneUp,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import AvaUser from "../assets/images/avatar.jpg";
import "../styles/management.scss";
import { useNavigate } from "react-router-dom";

const Management = ({ user }) => {
  let navigate = useNavigate();

  return (
    <>
      <div id="left-bar">
        <div id="left-bar-top">
          <img id="avatar" src={AvaUser} alt="avatar" />
          <div id="info">
            <p>{user.email || "Chưa có email"}</p>
            <p>
              Trạng thái: <span>{user.status || "Không xác định"}</span>
            </p>
            <p>
              Quyền: <span>{user.role || "Khách hàng"}</span>
            </p>
          </div>
        </div>
        <hr />
        <div id="left-bar-bottom">
          <button onClick={() => navigate("/user-account")}>
            <FontAwesomeIcon icon={faUserLarge} />
            <span className="clickInfo">Thông tin tài khoản</span>
          </button>
          <hr />
          <button onClick={() => navigate("/user-history")}>
            <FontAwesomeIcon icon={faPlaneUp} />
            <span className="clickInfo">Lịch sử đặt tour</span>
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
