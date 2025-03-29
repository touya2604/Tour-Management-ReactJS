import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/tourdetail.scss";
import tours from "../data/tourTest";
const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const tourId = Number(id);

    const fetchTour = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tours/${tourId}`);
        if (!response.ok) {
          throw new Error("Lỗi mạng hoặc API");
        }
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tour:", error);
        const foundTour = tours.find((t) => t.id === tourId);
        setTour(foundTour || null);
      }
    };

    fetchTour();
  }, [id]);

  if (!tour) return <p>Đang tải dữ liệu...</p>;
  const handleAddToCart = () => {
    const tourItem = {
      id: tour.id,
      name: tour.name,
      price: tour.price,
      image: tour.image,
      timestart: tour.timestart,
      quantity: 1,
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === tourItem.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(tourItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="tour-detail">
      <div className="tour-header">
        <img src={tour.image} alt={tour.name} className="tour-image" />
        <div className="tour-info">
          <h1 className="tour-title">{tour.name}</h1>
          <p className="tour-price">{tour.price.toLocaleString()} VNĐ</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <div className="tour-description">
        <h2>Mô tả</h2>
        <p>{tour.description || "Chưa có mô tả cho tour này."}</p>
      </div>
      <div className="tour-reviews">
        <h2>Đánh giá</h2>
        {tour.reviews && tour.reviews.length > 0 ? (
          tour.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-text">{review.comment}</p>
              <p className="review-user">
                {review.user} - {review.date}
              </p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default TourDetail;
