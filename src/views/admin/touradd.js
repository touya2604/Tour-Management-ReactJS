import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
import dayjs from "dayjs";

const TourAdd = () => {
  const [tour, setTour] = useState({
    title: "",
    code: `TOUR${Math.floor(Math.random() * 1000000)}`,
    images: "",
    price: 0,
    discount: 0,
    information: "",
    schedule: "",
    timeStart: "",
    stock: 1, // Số lượng khách tối thiểu là 1
    status: "active",
    position: 1,
    slug: "",
    deleted: 0,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category_title: "Tour mùa hè",
    price_special: 0,
  });

  const handleChange = (event, field) => {
    let value = event.target.value;

    if (field === "price" || field === "discount" || field === "stock") {
      value = value ? Math.max(0, parseFloat(value)) : 0; // Không cho giá trị âm
    }

    setTour((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNew = async () => {
    if (!tour.title.trim()) {
      alert("Vui lòng nhập địa điểm!");
      return;
    }
    if (tour.price <= 0) {
      alert("Giá vé phải lớn hơn 0!");
      return;
    }

    const discount = tour.discount ? parseFloat(tour.discount) : 0;
    const priceSpecial = Math.round(tour.price * (1 - discount / 100));

    const newTour = {
      ...tour,
      code: tour.code || `TOUR${Math.floor(Math.random() * 1000000)}`,
      images: JSON.stringify([tour.images]), // Lưu dưới dạng JSON string
      price: parseFloat(tour.price),
      discount,
      timeStart: tour.timeStart ? dayjs(tour.timeStart).toISOString() : null,
      stock: parseInt(tour.stock, 10),
      slug: tour.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      price_special: priceSpecial,
    };

    try {
      const response = await fetch("http://192.168.55.7:3000/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
      });

      if (!response.ok) {
        let errorText;
        try {
          const errorData = await response.json();
          errorText = errorData.message || "Lỗi không xác định từ server";
        } catch (e) {
          errorText = await response.text();
        }
        throw new Error(`Lỗi khi thêm mới tour: ${errorText}`);
      }

      setTour({
        title: "",
        code: `TOUR${Math.floor(Math.random() * 1000000)}`,
        images: "",
        price: 0,
        discount: 0,
        information: "",
        schedule: "",
        timeStart: "",
        stock: 1,
        status: "active",
        position: 1,
        slug: "",
        category_title: "Tour mùa hè",
      });

      alert("Tạo mới thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm tour:", error);
      alert("Có lỗi xảy ra khi thêm tour!");
    }
  };

  return (
    <div className="container mt-4 p-5 rounded custom-container">
      <div className="container p-4 rounded shadow-lg custom-boder">
        <h1 className="text-center custom-text">Tạo mới Tour</h1>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Địa điểm:</label>
                <input
                  type="text"
                  className="form-control"
                  value={tour.title}
                  onChange={(e) => handleChange(e, "title")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Thời gian đi:</label>
                <input
                  type="date"
                  className="form-control"
                  value={tour.timeStart}
                  onChange={(e) => handleChange(e, "timeStart")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giá vé:</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  value={tour.price}
                  onChange={(e) => handleChange(e, "price")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giảm giá (%):</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  max="100"
                  value={tour.discount}
                  onChange={(e) => handleChange(e, "discount")}
                />
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Số lượng khách:</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={tour.stock}
                  onChange={(e) => handleChange(e, "stock")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hình ảnh:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập URL ảnh"
                  value={tour.images}
                  onChange={(e) => handleChange(e, "images")}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn custom-color" onClick={handleAddNew}>
            Tạo mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourAdd;
