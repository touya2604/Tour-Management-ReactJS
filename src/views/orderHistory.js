import React, { useState, useEffect } from "react";
import "../styles/orderHistory.scss";

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [refundMessage, setRefundMessage] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const updatedData = storedData.map((order) => ({
      ...order,
      PayStatus: order.PayStatus || "pending",
    }));
    setOrderHistory(updatedData);
  }, []);

  const saveOrdersToLocalStorage = (orders) => {
    localStorage.setItem("orderHistory", JSON.stringify(orders));
    setOrderHistory(orders);
  };

  const handleCancel = (orderId) => {
    const updatedOrders = orderHistory.map((order) =>
      order.id === orderId ? { ...order, PayStatus: "canceled" } : order
    );
    saveOrdersToLocalStorage(updatedOrders);
  };

  const handleRefund = (orderId) => {
    const updatedOrders = orderHistory.map((order) => {
      if (order.id === orderId) {
        const totalAmount = order.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const refundAmount = totalAmount * 0.7; // 70% tổng tiền
        setRefundMessage(
          `Hoàn tiền thành công! Tổng tiền hoàn lại: ${refundAmount.toLocaleString()} VNĐ`
        );
        return { ...order, PayStatus: "refunded" };
      }
      return order;
    });
    saveOrdersToLocalStorage(updatedOrders);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "paid":
        return "status-paid";
      case "refunded":
        return "status-refunded";
      case "canceled":
        return "status-canceled";
      default:
        return "";
    }
  };

  return (
    <div className="history-container">
      <h2>Lịch sử đơn hàng</h2>
      {refundMessage && <p className="refund-message">{refundMessage}</p>}

      {orderHistory.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        orderHistory.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <h3>Đơn hàng #{order.id}</h3>
              <p className={`status ${getStatusClass(order.PayStatus)}`}>
                Trạng thái: {order.PayStatus}
              </p>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-detail">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="order-image"
                  />
                  <div className="order-info">
                    <p className="order-name">{item.title}</p>
                    <p className="order-price">
                      {item.price.toLocaleString()} VNĐ x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-actions">
              {order.PayStatus === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(order.id)}
                >
                  Hủy tour
                </button>
              )}
              {order.PayStatus === "paid" && (
                <button
                  className="refund-btn"
                  onClick={() => handleRefund(order.id)}
                >
                  Hoàn tiền
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
