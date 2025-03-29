import { useState, useEffect } from "react";
import "../../styles/cart.scss";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherList, setShowVoucherList] = useState(false);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const fixedCart = savedCart.map((item) => ({
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));
    setCart(fixedCart);
    if (showVoucherList) {
      fetch("http://localhost:5000/vouchers")
        .then((response) => {
          if (!response.ok) throw new Error("Lỗi khi lấy voucher");
          return response.json();
        })
        .then((data) => setVouchers(data))
        .catch((error) => console.error("Lỗi khi lấy voucher:", error));
    }
  }, [showVoucherList]);

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherList(false);
  };

  const totalAmount = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const discount = selectedVoucher
    ? (totalAmount * selectedVoucher.discount) / 100
    : 0;
  const finalAmount = totalAmount - discount;
  console.log("Cart data:", cart);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const orderData = {
      id: Date.now(),
      items: cart.map((item) => ({
        name: item.name,
        price: finalAmount,
        timestart: item.timestart,
        image: item.image,
      })),
    };

    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push(orderData);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    setCart([]);
    localStorage.removeItem("cart");
  };

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
            <button
              className="checkout-btn"
              onClick={() => {
                handleCheckout();
              }}
            >
              Thanh toán →
            </button>
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
