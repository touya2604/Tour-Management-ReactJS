import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../../styles/payment.scss";
import dayjs from "dayjs";
import Ph from "../../assets/images/logoFoot.png";
import { useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";

const Payment = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showVoucherList, setShowVoucherList] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
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
        if (response.ok && data.code === 200) {
          const processedOrders = Array.isArray(data.data.orderItems)
            ? data.data.orderItems.map((order) => ({
                ...order,
                price: parseInt(order.price, 10) || 0,
                totalAmount:
                  parseFloat(order.price_special) * (order.quantity ?? 1),
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

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/vouchers`
        );
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setVouchers(
            result.data
              .filter((voucher) => voucher.status === "Active")
              .map((voucher) => ({
                ...voucher,
                minAmount: parseFloat(voucher.minAmount) * 1_000_000,
              }))
          );
        }
      } catch (error) {
        console.error("Lỗi khi tải voucher:", error);
      }
    };
    if (showVoucherList) fetchVouchers();
  }, [showVoucherList]);

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const getTotalAmount = () => {
    return orderHistory.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );
  };

  const applyVoucher = (voucher) => {
    const totalAmount = getTotalAmount();
    console.log(totalAmount);
    console.log(voucher.minAmount);
    if (totalAmount < voucher.minAmount) {
      alert(
        `Voucher này chỉ áp dụng cho đơn hàng tối thiểu ${voucher.minAmount.toLocaleString()} VND`
      );
      return;
    }

    const discountAmount = (voucher.discount / 100) * totalAmount;
    localStorage.setItem("finalAmount", discountAmount);
    setSelectedVoucher(voucher);
    setDiscount(discountAmount);
  };

  const handleCheckout = async () => {
    try {
      const token = Cookies.get("tokenUser");
      if (!token) {
        alert("Bạn cần đăng nhập để thanh toán.");
        return;
      }

      if (selectedOrders.length === 0) {
        alert("Vui lòng chọn ít nhất một đơn hàng để thanh toán!");
        return;
      }

      const selectedTours = orderHistory
        .filter((order) => selectedOrders.includes(order.id))
        .map((order) => order.id);

      const response = await fetch("http://localhost:3000/user/paymentPost", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderItemsId: selectedTours }),
      });

      const data = await response.json();
      if (response.ok && data.code === 200) {
        alert("Thanh toán thành công");
        navigate("/orderDetail");
      } else {
        alert("Thanh toán thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu thanh toán:", error);
      alert("Không thể kết nối đến server.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Thanh Toán</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="error-message">{error}</p>}
      {orderHistory.length === 0 && !loading && !error && (
        <p>Không có đơn hàng nào.</p>
      )}

      {orderHistory.map((order) => (
        <div key={order.id} className="payment-item">
          <input
            type="checkbox"
            checked={selectedOrders.includes(order.id)}
            onChange={() => toggleOrderSelection(order.id)}
          />
          <div className="payment-info">
            <h3 onClick={() => navigate(`/tour/detail/${order.slug}`)}>
              {order.title}
            </h3>
            <p>Giá gốc: {order.price.toLocaleString()} VND</p>
            <p>Giảm giá: {order.discount ?? 0}%</p>
            <p>Số lượng: {order.quantity ?? 1}</p>
            <p>Thành tiền: {order.totalAmount.toLocaleString()} VND</p>
          </div>
          <img src={order.images} alt={order.title} className="payment-image" />
        </div>
      ))}

      <div className="payment-summary">
        <p>Tổng cộng: {getTotalAmount().toLocaleString()} VND</p>
        <p>Giảm giá voucher: {discount.toLocaleString()} VND</p>
        <p>
          Thành tiền (sau giảm giá):{" "}
          {(getTotalAmount() - discount).toLocaleString()} VND
        </p>
      </div>
      <div className="payVou-container">
        <div className="payment-actions">
          <button
            className="btn-voucher"
            onClick={() => setShowVoucherList(!showVoucherList)}
          >
            Sử dụng voucher
          </button>
          <button className="btn-checkout" onClick={handleCheckout}>
            Thanh toán
          </button>
        </div>
        {showVoucherList && (
          <div className="voucher-container">
            <h3>Danh sách Voucher</h3>
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <div key={voucher.id} className="voucher-item">
                  <img src={Ph} alt="Voucher" />
                  <div className="voucher-info">
                    <p>
                      <strong>Giảm {voucher.discount}%</strong>
                      <span className="voucher-expiry">
                        Ngày hết hạn:{" "}
                        {dayjs(voucher.timeEnd).format("DD/MM/YYYY")}
                      </span>
                    </p>
                    <p>
                      Số tiền tối thiểu: {voucher.minAmount.toLocaleString()}{" "}
                      VND
                    </p>
                  </div>
                  <button onClick={() => applyVoucher(voucher)}>Dùng</button>
                </div>
              ))
            ) : (
              <p>Không có voucher nào khả dụng.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
