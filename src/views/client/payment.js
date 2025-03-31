import React, { useState, useEffect } from "react";
import "../../styles/history.scss";
import * as systemConfig from "../../config/system";
import dayjs from "dayjs";
import Ph from "../../assets/images/logoFoot.png";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherList, setShowVoucherList] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const orderHistory =
        JSON.parse(localStorage.getItem("orderHistory")) || [];
      if (!Array.isArray(orderHistory)) {
        console.error("Dữ liệu orderHistory không hợp lệ.");
        setCartItems([]);
        return;
      }

      // Lấy danh sách đơn hàng có trạng thái "pending"
      const pendingOrders = orderHistory.filter(
        (order) => order.status === "pending"
      );

      // Gộp tất cả tour từ các đơn "pending"
      const selectedTours = pendingOrders.flatMap((order) => order.items);

      setCartItems(selectedTours);
    } catch (error) {
      console.error("Lỗi khi đọc dữ liệu từ localStorage:", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          `http://192.168.55.2:3000${systemConfig.prefixAdmin}/vouchers`
        );
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setVouchers(
            result.data.filter((voucher) => voucher.status === "Active")
          );
        } else {
          console.error("Dữ liệu trả về không đúng định dạng!");
        }
      } catch (error) {
        console.error("Lỗi khi tải voucher:", error);
      }
    };
    if (showVoucherList) fetchVouchers();
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
    .reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const discount = selectedVoucher
    ? (totalPrice * (selectedVoucher.discount || 0)) / 100
    : 0;
  const finalAmount = Math.max(totalPrice - discount, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Chưa chọn sản phẩm để thanh toán!");
      return;
    }

    let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    if (!Array.isArray(orderHistory)) orderHistory = [];

    // Cập nhật trạng thái của các đơn hàng "pending" thành "paid"
    const newOrders = orderHistory.map((order) => {
      if (
        order.status === "pending" &&
        order.items.some((item) => selectedItems.includes(item.id))
      ) {
        return order; // Giữ nguyên đơn cũ
      }
      return order;
    });

    // Tạo bản ghi mới cho đơn đã thanh toán
    const paidOrders = orderHistory
      .filter((order) => order.status === "pending")
      .map((order) => ({
        ...order,
        id: Date.now(), // Tạo ID mới để giữ lịch sử đơn
        status: "paid",
      }));

    const updatedOrderHistory = [...newOrders, ...paidOrders];

    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));

    alert("Thanh toán thành công!");
    navigate("/orderDetail");
  };

  return (
    <div className="cart-container">
      <h2>Thanh toán</h2>
      <div className="content-wrapper">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Chưa có đơn hàng nào.</p>
          ) : (
            cartItems.map((item) => {
              const quantity = item.quantity || 1;
              const price = item.price || 0;
              const total = price * quantity;
              const imageSrc = Array.isArray(item.images)
                ? item.images[0]
                : item.images;

              return (
                <div key={item.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <img src={imageSrc} alt={item.title} className="tour-image" />
                  <div className="tour-info">
                    <h3>{item.title}</h3>
                    <p className="price">{price.toLocaleString()} VNĐ</p>
                    <p className="quantity">Số lượng: {quantity}</p>
                    <p className="total-price">
                      Tổng: {total.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {showVoucherList && (
          <div className="voucher-list">
            <h3>Danh sách Voucher</h3>
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <div key={voucher.id} className="voucher-item">
                  <img src={Ph} alt="alt" />
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
        <button className="checkout-btn" onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Payment;
