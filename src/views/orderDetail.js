import React, { useEffect, useState } from "react";
// import "../../styles/orderDetail.scss";
import dayjs from "dayjs";
import Cookies from "js-cookie";
const OrderDetail = () => {
  const [paidOrders, setPaidOrders] = useState([]);

  useEffect(() => {
    const fetchPaidOrders = async () => {
      try {
        const orderItemsId = localStorage.getItem("orderItemsId");
        const token = Cookies.get("tokenUser");
        const response = await fetch(
          "http://192.168.55.2:3000/user/paymentPost",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: orderItemsId,
          }
        );
        const data = await response.json();
        console.log(data.data.orderItems);
        if (response.ok && data.code === 200) {
          setPaidOrders(data.data);
        } else {
          console.error(
            "Lỗi khi lấy danh sách đơn hàng đã thanh toán:",
            data.message
          );
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến server:", error);
      }
    };

    fetchPaidOrders();
  }, []);

  return (
    <div className="order-detail-container">
      <h2>Chi Tiết Đơn Hàng</h2>
      {paidOrders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        paidOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={order.images} alt={order.title} className="order-image" />
            <div className="order-info">
              <h3>{order.title}</h3>
              <p>
                Ngày thanh toán:{" "}
                {dayjs(order.timeStart).format("DD/MM/YYYY HH:mm")}
              </p>
              <p>Số lượng: {order.quantity}</p>
              <p>Tổng tiền: {order.totalAmount.toLocaleString()} VND</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetail;
