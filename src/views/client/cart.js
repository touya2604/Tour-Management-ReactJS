import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/cart.scss";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

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

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckout = () => {
    const selectedCartItems = cart.filter((item) => selectedItems[item.id]);
    if (selectedCartItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }

    const orderData = {
      id: Date.now(),
      items: selectedCartItems.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.images,
      })),
    };

    localStorage.setItem("orderHistory", JSON.stringify(orderData));

    setCart(cart.filter((item) => !selectedItems[item.id]));
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => !selectedItems[item.id]))
    );

    setSelectedItems({});
    navigate("/payment-success");
  };

  const totalAmount = cart.reduce(
    (total, item) =>
      selectedItems[item.id]
        ? total + (Number(item.price) || 0) * (Number(item.quantity) || 1)
        : total,
    0
  );

  return (
    <div id="gray-background">
      <div className="cart-container">
        <h2 className="cart-title">Giỏ hàng</h2>
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <input
                type="checkbox"
                checked={!!selectedItems[item.id]}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <img src={item.images} alt={item.title} className="cart-image" />
              <div className="cart-info">
                <p className="cart-name">{item.title}</p>
                <p className="cart-price">{item.price.toLocaleString()} VNĐ</p>
              </div>
              <div className="cart-quantity">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="quantity-value">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
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
          <p>Tổng đơn (đã chọn): {totalAmount.toLocaleString()} VNĐ</p>
        </div>
        <div className="cart-actions">
          <button className="checkout-btn" onClick={handleCheckout}>
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
