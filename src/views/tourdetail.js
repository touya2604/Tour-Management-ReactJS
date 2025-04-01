import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/tourdetail.scss";
const TourDetail = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tours`);
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");

        const data = await response.json();
        console.log("API response:", data);

        if (Array.isArray(data.data)) {
          const toursWithParsedImages = data.data.map((tour) => ({
            ...tour,
            images:
              typeof tour.images === "string"
                ? JSON.parse(tour.images)
                : tour.images,
            quantity: 0,
          }));

          const selectedTour = toursWithParsedImages.find(
            (t) => t.slug === slug
          );
          setTour(selectedTour || null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTours();
  }, [slug]);

  if (!tour) return <p>Đang tải dữ liệu...</p>;

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.id === tour.id);
    let updatedCart;
    if (tour.quantity === 0) {
      alert("Vui lòng nhập số lượng tour");
      return;
    }
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === tour.id
          ? { ...item, quantity: item.quantity + tour.quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { id: tour.id, quantity: tour.quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Đã thêm vào giỏ hàng!");
  };

  const updateQuantity = (amount) => {
    setTour((prevTour) => {
      const newQuantity = prevTour.quantity + amount;
      if (newQuantity > prevTour.stock) {
        alert("Số lượng đã vượt quá số tồn");
        return { ...prevTour, quantity: prevTour.stock };
      }
      return { ...prevTour, quantity: newQuantity };
    });
  };

  const handleChangeQuantity = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "");

    let sl = value ? parseInt(value, 10) : 0;

    if (sl > tour.stock) {
      alert("Số lượng không thể lớn hơn số tồn");
      sl = tour.stock;
    }

    setTour((prevTour) => ({
      ...prevTour,
      quantity: Math.max(1, sl),
    }));
  };

  return (
    <div className="tour-detail">
      <div className="tour-header">
        <img src={tour.images[0]} alt={tour.title} className="tour-image" />
      </div>
      <div className="tour-info">
        <h1 className="tour-title">{tour.title}</h1>
        <div className="tour-description">
          <h2>Mô tả</h2>
          <p>{tour.information || "Chưa có mô tả cho tour này."}</p>
          <h2>Lịch trình của Tour:</h2>
          <p>{tour.schedule}</p>
        </div>
        <p className="tour-price">
          {tour.price ? tour.price.toLocaleString() : "Liên hệ"} VNĐ
        </p>
        <p className="tour-stock">Số lượng Tour: {tour.stock}</p>
        <div className="cart-quantity">
          <button onClick={() => updateQuantity(-1)}>-</button>
          <input
            type="text"
            value={tour.quantity}
            className="quantity-value"
            onChange={(event) => handleChangeQuantity(event, "quantity")}
          />
          <button onClick={() => updateQuantity(1)}>+</button>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default TourDetail;
