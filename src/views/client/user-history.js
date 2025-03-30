import React, { useState, useEffect } from "react";
import "../../styles/history.scss";
import * as systemConfig from "../../config/system";
import dayjs from "dayjs";
import Ph from "../../assets/images/placeholder.jpg";
const History = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherList, setShowVoucherList] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setCartItems(orderHistory.items || []);
  }, []);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          `http://192.168.55.14:3000${systemConfig.prefixAdmin}/vouchers`
        );
        const result = await response.json();

        console.log("Dữ liệu nhận được từ API:", result);

        if (result.data && Array.isArray(result.data)) {
          const activeVouchers = result.data.filter(
            (voucher) => voucher.status === "Active"
          );
          setVouchers(activeVouchers);
        } else {
          console.error("Dữ liệu trả về không đúng định dạng!");
        }
      } catch (error) {
        console.error("Lỗi khi tải voucher:", error);
      }
    };

    if (showVoucherList) {
      fetchVouchers();
    }
  }, [showVoucherList]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applyVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherList(false);
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = selectedVoucher
    ? (totalPrice * selectedVoucher.discount) / 100
    : 0;
  const finalAmount = totalPrice - discount;

  return (
    <div className="cart-container">
      <h2>Lịch sử đặt hàng</h2>
      <div className="content-wrapper">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Chưa có đơn hàng nào.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <img src={item.image} alt={item.name} className="tour-image" />
                <div className="tour-info">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price.toLocaleString()} VNĐ</p>
                  <p className="quantity">Số lượng: {item.quantity}</p>
                  <p className="total-price">
                    Tổng: {(item.price * item.quantity).toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {showVoucherList && (
          <div className="voucher-list">
            <h3>Danh sách Voucher</h3>
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <div key={voucher.id} className="voucher-item">
                  <img src={Ph} />
                  <p>
                    <strong>Giảm {voucher.discount}%</strong>
                  </p>
                  <p>
                    Hạn sử dụng:{" "}
                    {dayjs(voucher.timeStart).format("DD/MM/YYYY HH:mm")}
                  </p>
                  <button onClick={() => applyVoucher(voucher)}>Dùng</button>
                </div>
              ))
            ) : (
              <p>Không có voucher nào khả dụng.</p>
            )}
          </div>
        )}
      </div>

      <div className="cart-summary">
        <p>Tổng đơn: {totalPrice.toLocaleString()} VNĐ</p>
        {selectedVoucher && <p>Giảm giá: {discount.toLocaleString()} VNĐ</p>}
        <p>Thành tiền: {finalAmount.toLocaleString()} VNĐ</p>
      </div>
      <div className="cart-actions">
        <button
          className="voucher-btn"
          onClick={() => setShowVoucherList(!showVoucherList)}
        >
          Sử dụng voucher
        </button>
        <button className="checkout-btn">Thanh toán</button>
      </div>
    </div>
  );
};

export default History;
