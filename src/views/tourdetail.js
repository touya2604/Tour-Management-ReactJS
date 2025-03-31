import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/tourdetail.scss";

const TourDetail = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("scart")) || [];
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://192.168.55.3:3000/tours`);
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");

        const data = await response.json();
        console.log("API response:", data);

        if (Array.isArray(data.data)) {
          const toursWithParsedImages = data.data.map((tour) => ({
            ...tour,
            images: JSON.parse(tour.images),
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

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === tour.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { id: tour.id, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("scart", JSON.stringify(updatedCart));
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="tour-detail">
      <div className="tour-header">
        <img src={tour.images} alt={tour.title} className="tour-image" />
        <div className="tour-info">
          <h1 className="tour-title">{tour.title}</h1>
          <p className="tour-price">
            {tour.price ? tour.price.toLocaleString() : "Liên hệ"} VNĐ
          </p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <div className="tour-description">
        <h2>Mô tả</h2>
        <p>{tour.information || "Chưa có mô tả cho tour này."}</p>
        <p>{tour.schedule}</p>
      </div>
    </div>
  );
};

export default TourDetail;
