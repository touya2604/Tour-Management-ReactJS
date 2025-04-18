import React, { useState, useEffect } from "react";
import "../styles/orderHistory.scss";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get("tokenUser");
        if (!token) {
          setError("Vui lòng đăng nhập để xem lịch sử đặt tour!");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:3000/user/tourBookingHistory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        // console.log(data)
        if (response.ok && data.code === 200) {
          // for (const i of data.data.orderItems) {
          //   // console.log(parseFloat(i.price_special) * i.quantity);
          //   console.log(i.title);
          //   console.log(i.price_special);
          // }
          const processedOrders = Array.isArray(data.data.orderItems)
            ? data.data.orderItems.map((order) => ({
                ...order,
                totalAmount: parseFloat(order.price_special) * order.quantity,
              }))
            : [];
          setOrderHistory(processedOrders);
        } else {
          setError(data.message || "Lỗi khi lấy lịch sử đơn hàng!");
        }
      } catch (err) {
        console.error("Lỗi khi fetch đơn hàng:", err);
        setError("Không thể kết nối đến server!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = (orderId, orderItemId) => async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/cancelTour`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderItemId }),
      });

      if (!response.ok) throw new Error("Lỗi khi cập nhật tour");

      alert(`Hủy tour thành công! (ID: ${orderId})`);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  const handleRefund = (order) => async () => {
    if (!order.paymentDate || !order.totalAmount) return;

    try {
      const response = await fetch(`http://localhost:3000/user/refundMoney`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderItemId: order.id }),
      });
      console.log(response);
      if (!response.ok) throw new Error("Lỗi");
      alert(`Trả tiền thành công! (ID: ${order.id})`);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra ");
    }
  };

  return (
    <div className="history-container">
      <h2>Lịch sử đơn hàng</h2>

      {loading && <p>Đang tải...</p>}
      {error && <p className="error-message">{error}</p>}

      {orderHistory.length === 0 && !loading && !error && (
        <p>Không có đơn hàng nào.</p>
      )}

      {orderHistory.map((order, index) => (
        <div key={index} className="order-item">
          <div className="order-header">
            <h3 onClick={() => navigate(`/tour/detail/${order.slug}`)}>
              {order.title}
            </h3>

            <p>Số lượng: {order.quantity}</p>
            <p>
              Tổng tiền: {order.price_special * order.quantity.toLocaleString()}{" "}
              VNĐ
            </p>
            <p>Ngày đặt: {dayjs(order.timeStart).format("DD/MM/YYYY HH:mm")}</p>
            {order.status === "completed" && order.paymentDate && (
              <>
                <p>
                  Ngày thanh toán:{" "}
                  {dayjs(order.paymentDate).format("DD/MM/YYYY HH:mm")}
                </p>
                {dayjs().diff(dayjs(order.paymentDate), "day") <= 3 && (
                  <button onClick={handleRefund(order)} className="refund-btn">
                    Hoàn tiền
                  </button>
                )}
              </>
            )}

            {order.status === "pending" && (
              <>
                <button
                  onClick={handleCancel(order.orderId, order.id)}
                  className="cancel-btn"
                >
                  Hủy tour
                </button>
              </>
            )}

            <p
              className={`status status-${
                order.status ? order.status.toLowerCase() : "unknown"
              }`}
            >
              Trạng thái: {order.status}
            </p>
          </div>

          <img src={order.images} alt={order.title} className="order-image" />
        </div>
      ))}
    </div>
  );
};

export default History;
