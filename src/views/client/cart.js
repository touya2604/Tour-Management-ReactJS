import { useState, useEffect } from "react";
import "../../styles/cart.scss";
import { useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";
import Cookies from "js-cookie";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [tours, setTours] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const token = Cookies.get("tokenUser");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [emailLog, setMail] = useState("");
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:3000/tours");
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
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/customers`
        );

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách khách hàng");

        const data = await response.json();
        const User = Array.isArray(data.data) ? data.data : [];
        const mailLogin = User.find((to) => to.token === token);
        setMail(mailLogin ? mailLogin.email : "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, [token]);

  const handleCheckout = async () => {
    if (role !== "customer" && role !== "admin") {
      alert("Vui lòng đăng nhập trước khi đặt hàng");
      return;
    }
    if (emailLog !== email) {
      alert("Email không trùng với email tài khoản");
      return;
    }
    if (!fullName || !email || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin cá nhân.");
      return;
    }
    if (phone.length !== 10 || !phone.startsWith("0")) {
      alert("Số điện thoại không hợp lệ");
      return;
    }
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!nameRegex.test(fullName)) {
      alert("Tên không được chứa số hoặc ký tự đặc biệt!");
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
      const response = await fetch("http://localhost:3000/orders", {
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
  const handleChangeQuantity = (event, id) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
    let sl = value ? parseInt(value, 10) : 1;

    const tour = tours.find((tour) => tour.id === id);
    if (tour) {
      if (sl > tour.stock) {
        alert("Số lượng không thể lớn hơn số tồn");
        sl = tour.stock;
      }
    }

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, sl) } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const tour = tours.find((tour) => tour.id === id);
        const newQuantity = item.quantity + amount;

        if (tour && newQuantity > tour.stock) {
          alert("Số lượng đã vượt quá số tồn");
          return { ...item, quantity: tour.stock };
        }

        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                  <p className="tour-stock">Số lượng: {tour.stock}</p>
                  <p className="cart-price">
                    {tour.price.toLocaleString()} VNĐ
                  </p>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <input
                    type="text"
                    className="quantity-value"
                    onChange={(event) => handleChangeQuantity(event, item.id)}
                    value={item.quantity}
                  />
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
