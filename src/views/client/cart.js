import { useState, useEffect } from "react";
import "../../styles/cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [tours, setTours] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://192.168.55.2:3000/tours");
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");
        const data = await response.json();

        const tourData = Array.isArray(data.data)
          ? data.data.map((tour) => ({
              ...tour,
              images: tour.images ? JSON.parse(tour.images) : [],
            }))
          : [];

        setTours(tourData);
      } catch (error) {
        console.error("Lỗi khi fetch tour:", error);
      }
    };

    fetchTours();
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
    console.log(role);
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckout = async () => {
    if (role !== "customer" && role !== "admin") {
      alert("Vui lòng đăng nhập trước khi đặt hàng");
      return;
    }

    if (!fullName || !email || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin cá nhân.");
      return;
    }

    const selectedCartItems = cart.filter((item) => selectedItems[item.id]);
    if (selectedCartItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }

    const orderData = {
      customerInfo: { fullName, email, phone, note },
      cart: selectedCartItems,
    };
    console.log(orderData);

    try {
      const response = await fetch("http://192.168.55.2:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Lỗi khi đặt hàng");

      alert("Đặt hàng thành công!");
      localStorage.removeItem("cart");
      setCart([]);
      setSelectedItems({});
      setFullName("");
      setEmail("");
      setPhone("");
      setNote("");
      navigate("/user-history");
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng, vui lòng thử lại!");
    }
  };

  const totalAmount = cart.reduce((total, item) => {
    const tour = tours.find((tour) => tour.id === item.id);
    return selectedItems[item.id] && tour
      ? total + (Number(tour.price) || 0) * (Number(item.quantity) || 1)
      : total;
  }, 0);

  return (
    <div id="gray-background">
      <div className="cart-container">
        <h2 className="cart-title">Giỏ hàng</h2>
        <div className="cart-list">
          {cart.map((item) => {
            const tour = tours.find((tour) => tour.id === item.id);
            if (!tour) return null;
            return (
              <div key={item.id} className="cart-item">
                <input
                  type="checkbox"
                  checked={!!selectedItems[item.id]}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <img
                  src={tour.images[0] || "/placeholder.jpg"}
                  alt={tour.title}
                  className="cart-image"
                />
                <div className="cart-info">
                  <p className="cart-name">{tour.title}</p>
                  <p className="cart-price">
                    {tour.price.toLocaleString()} VNĐ
                  </p>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className="cart-total">
                  {(tour.price * item.quantity).toLocaleString()} VNĐ
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                >
                  Xóa
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <label>
            Họ và tên:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Số điện thoại:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Ghi chú:
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
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
