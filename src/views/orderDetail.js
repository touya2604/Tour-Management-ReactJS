import React, { useEffect, useState } from "react";
import "../styles/orderDetails.scss"; // File SCSS riêng để thiết kế
import dayjs from "dayjs";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    try {
      const order = JSON.parse(localStorage.getItem("lastOrder"));
      if (
        order &&
        Array.isArray(order.items) &&
        typeof order.total === "number" &&
        typeof order.finalAmount === "number"
      ) {
        setOrderData(order);
      } else {
        console.error("Dữ liệu đơn hàng không hợp lệ!", order);
        setOrderData(null);
      }
    } catch (error) {
      console.error("Lỗi khi đọc đơn hàng từ localStorage:", error);
      setOrderData(null);
    }
  }, []);

  if (!orderData) {
    return <p className="no-order">Không có đơn hàng nào.</p>;
  }

  return (
    <div className="order-container">
      <h2>Thông tin đơn hàng</h2>
      <p className="order-date">
        Ngày đặt hàng: {dayjs(orderData.date).format("DD/MM/YYYY HH:mm")}
      </p>

      <div className="order-items">
        {orderData.items.map((item, index) => {
          const price = item.price || 0; // Đảm bảo price luôn có giá trị
          const quantity = item.quantity || 1; // Đảm bảo quantity không bị undefined
          const total = price * quantity;
          const imageSrc = Array.isArray(item.images)
            ? item.images[0]
            : item.images; // Nếu `images` là mảng, lấy phần tử đầu

          return (
            <div key={index} className="order-item">
              <img src={imageSrc} alt={item.name} className="tour-image" />
              <div className="tour-info">
                <h3>{item.name}</h3>
                <p className="price">Giá: {price.toLocaleString()} VNĐ</p>
                <p className="quantity">Số lượng: {quantity}</p>
                <p className="total">Tổng: {total.toLocaleString()} VNĐ</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="order-summary">
        <p>Tổng tiền: {(orderData.total || 0).toLocaleString()} VNĐ</p>
        {orderData.discount > 0 && (
          <p>Giảm giá: {(orderData.discount || 0).toLocaleString()} VNĐ</p>
        )}
        <p className="final-amount">
          Thành tiền: {(orderData.finalAmount || 0).toLocaleString()} VNĐ
        </p>
      </div>

      <button className="back-btn" onClick={() => window.history.back()}>
        Quay lại
      </button>
    </div>
  );
};

export default OrderDetails;
