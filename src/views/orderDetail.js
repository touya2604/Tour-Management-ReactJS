import React, { useEffect, useState } from "react";
// import "../../styles/orderDetail.scss";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const [paidOrders, setPaidOrders] = useState([]);
  const navigate = useNavigate();
  const finalAmount = localStorage.getItem("finalAmount");
  useEffect(() => {
    const fetchPaidOrders = async () => {
      try {
        const token = Cookies.get("tokenUser");
        const response = await fetch(
          "http://localhost:3000/user/paymentSuccess",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.code === 200) {
          const processedPaidOrders = Array.isArray(data.data.orderItems)
            ? data.data.orderItems.map((order) => ({
                ...order,
                totalAmount: parseFloat(order.price_special) * order.quantity,
              }))
            : [];
          setPaidOrders(processedPaidOrders);
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
  const getTotalAmount = () => {
    return paidOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  };

  return (
    <div className="payment-container">
      <h2>Cảm ơn bạn đã đặt hàng!</h2>
      <h3>Thông tin đơn hàng</h3>

      {paidOrders.length === 0 && <p>Không có đơn hàng nào.</p>}

      {paidOrders.map((Porder) => (
        <div key={Porder.id} className="payment-item">
          <div className="payment-info">
            <h3 onClick={() => navigate(`/tour/detail/${Porder.slug}`)}>
              {Porder.title}
            </h3>
            <p>Giá gốc: {(Number(Porder.price) || 0).toLocaleString()} VND</p>
            <p>Giảm giá: {Porder.discount ?? 0}%</p>
            <p>Số lượng: {Porder.quantity ?? 1}</p>
            <p>
              Thành tiền: {(Number(Porder.totalAmount) || 0).toLocaleString()}{" "}
              VND
            </p>
          </div>
          <img
            src={Porder.images}
            alt={Porder.title}
            className="payment-image"
          />
        </div>
      ))}

      <p>Tổng cộng: {getTotalAmount().toLocaleString()} VND</p>
    </div>
  );
};

export default OrderDetail;
