import React from "react";
import Management from "../components/management";
import "../styles/delete.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DeleteAcc = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản?")) return;

    try {
      // const response = await fetch("http://localhost:3000/user/editInfo", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({ deleted: true }),
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const data = await response.json();
      // console.log("Delete Response:", data);

      alert("Tài khoản đã được xóa thành công!");
      Cookies.remove(token);
      localStorage.removeItem("role");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div id="container-account">
        <Management />
        <div id="right-bar">
          <h1 id="right-bar-top">Xóa Tài khoản</h1>
          <div id="right-bar-bottom-delete">
            <h1 id="delete-alert">Lưu ý về việc xóa tài khoản</h1>
            <p className="delete-note">
              Khi bạn thực hiện yêu cầu xóa tài khoản, toàn bộ dữ liệu liên
              quan, bao gồm thông tin cá nhân, lịch sử giao dịch và các dữ liệu
              khác sẽ bị xóa vĩnh viễn và không thể khôi phục. Việc xóa tài
              khoản là hành động không thể đảo ngược, vì vậy hãy cân nhắc kỹ
              trước khi tiếp tục.
            </p>
            <p className="delete-note">
              Nếu bạn cần hỗ trợ hoặc có bất kỳ thắc mắc nào, vui lòng liên hệ
              với bộ phận chăm sóc khách hàng trước khi tiến hành xóa tài khoản.
            </p>
            <p className="delete-note">
              Hệ thống không chịu trách nhiệm đối với bất kỳ mất mát nào phát
              sinh sau khi tài khoản của bạn bị xóa, bao gồm nhưng không giới
              hạn ở dữ liệu cá nhân, đặt chỗ, quyền lợi hoặc các nội dung liên
              quan. Bằng việc xác nhận xóa tài khoản, bạn đồng ý từ bỏ mọi quyền
              khiếu nại liên quan đến dữ liệu đã bị xóa.
            </p>
            <button id="delete-button" onClick={handleDeleteAccount}>
              Xác nhận xoá tài khoản
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteAcc;
