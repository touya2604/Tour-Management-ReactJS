import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.scss";

const Cart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "ĐÀ NẴNG – HỘI AN – BÀ NÀ – HUẾ",
      price: 3990000,
      quantity: 1,
      image: "tour1.jpg",
    },
    {
      id: 2,
      name: "ĐÀ NẴNG – HỘI AN – BÀ NÀ – HUẾ – PHONG NHA",
      price: 4550000,
      quantity: 2,
      image: "tour2.jpg",
    },
  ]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherList, setShowVoucherList] = useState(false);

  useEffect(() => {
    if (showVoucherList) {
      axios
        .get("http://localhost:5000/vouchers") //Thay bằng của ô
        .then((response) => setVouchers(response.data))
        .catch((error) => console.error("Lỗi khi lấy voucher:", error));
    }
  }, [showVoucherList]);

  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const applyVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherList(false);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = selectedVoucher
    ? (totalAmount * selectedVoucher.discount) / 100
    : 0;
  const finalAmount = totalAmount - discount;

  return (
    <>
      <div id="gray-background">
        <div className="cart-container">
          <h2 className="cart-title">Giỏ hàng</h2>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-info">
                  <p className="cart-name">{item.name}</p>
                  <p className="cart-price">
                    {item.price.toLocaleString()} VNĐ
                  </p>
                </div>
                <div className="cart-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="cart-total">
                  {(item.price * item.quantity).toLocaleString()} VNĐ
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            Tổng đơn: {totalAmount.toLocaleString()} VNĐ
            {selectedVoucher && (
              <p className="voucher-applied">
                Giảm giá: {discount.toLocaleString()} VNĐ
              </p>
            )}
            <p className="final-amount">
              Thành tiền: {finalAmount.toLocaleString()} VNĐ
            </p>
          </div>
          <div className="cart-actions">
            <button
              className="voucher-btn"
              onClick={() => setShowVoucherList(true)}
            >
              Sử dụng voucher
            </button>
            <button className="checkout-btn">Thanh toán →</button>
          </div>
        </div>

        {showVoucherList && (
          <div id="voucher-list">
            <h1>Danh sách Voucher</h1>
            <div id="voucher-detail">
              {vouchers.length > 0 ? (
                vouchers.map((voucher) => (
                  <div key={voucher.id} id="voucher-item">
                    <img src={voucher.image} alt={voucher.name} />
                    <div>
                      <p>
                        <strong>{voucher.name}</strong>
                      </p>
                      <p>Giảm {voucher.discount}%</p>
                      <button
                        id="buttonUse"
                        onClick={() => applyVoucher(voucher)}
                      >
                        Dùng
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có voucher nào</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
