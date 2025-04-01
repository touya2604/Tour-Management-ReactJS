import React, { useState, useEffect } from "react";
import Management from "../components/management";
import "../styles/delete.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DeleteAcc = () => {
  const token = localStorage.getItem("token");
  const [orderHistory, setOrderHistory] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get("tokenUser");

        const response = await fetch(
          "http://localhost:3000/user/tourBookingHistory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.code === 200) {
          const processedOrders = Array.isArray(data.data.orderItems)
            ? data.data.orderItems.map((order) => ({
                ...order,
                totalAmount: parseFloat(order.price_special) * order.quantity,
              }))
            : [];
          setOrderHistory(processedOrders);
        } else {
        }
      } catch (err) {
        console.error("Lỗi khi fetch đơn hàng:", err);
      }
    };

    fetchOrders();
  }, []);
  const handleDeleteAccount = async () => {
    try {
      if (role === "admin") {
        throw new Error("Không được phép xóa tài khoản Quản trị viên");
      }
      if (
        orderHistory.length > 0 &&
        orderHistory.find((item) => item.status === "completed")
      ) {
        const isConfirmed = window.confirm(
          "Hiện có Tour đã được thanh toán. Vui lòng xác nhận kỹ rằng có muốn xóa tài khoản không ?"
        );
        if (isConfirmed) {
          alert("Tài khoản đã được xóa thành công!");
          Cookies.remove(token);
          localStorage.removeItem(role);
          navigate("/");
          window.location.reload();
        } else {
          throw new Error("Tài khoản không được xóa");
        }
      }
      if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản?")) return;
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
              Khi bạn yêu cầu tạm ngừng tài khoản, một số dữ liệu liên quan, bao
              gồm thông tin cá nhân và lịch sử giao dịch, sẽ bị ẩn hoặc tạm dừng
              truy cập. Tuy nhiên, các dữ liệu này sẽ không bị xóa vĩnh viễn và
              có thể được khôi phục sau khi bạn kích hoạt lại tài khoản.
            </p>
            <p className="delete-note">
              Nếu bạn cần hỗ trợ hoặc có bất kỳ thắc mắc nào, vui lòng liên hệ
              với bộ phận chăm sóc khách hàng trước khi tiến hành tạm ngừng tài
              khoản.
            </p>
            <p className="delete-note">
              Hệ thống không chịu trách nhiệm đối với bất kỳ mất mát hoặc gián
              đoạn nào phát sinh trong thời gian tài khoản của bạn bị tạm ngừng,
              bao gồm nhưng không giới hạn ở quyền lợi, dịch vụ hoặc các nội
              dung liên quan. Bằng việc xác nhận tạm ngừng tài khoản, bạn đồng ý
              từ bỏ mọi quyền khiếu nại liên quan đến tình trạng tài khoản tạm
              ngừng.
            </p>

            <button id="delete-button" onClick={handleDeleteAccount}>
              Yêu cầu xoá tài khoản
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteAcc;
