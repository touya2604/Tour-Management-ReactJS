import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
import dayjs from "dayjs";
import * as systemConfig from "../../config/system";

const TourAdd = () => {
  const [images, setImages] = useState([]);
  const [cates, setCate] = useState([]);
  const [tour, setTour] = useState({
    title: "",
    code: `TOUR${Math.floor(Math.random() * 1000000)}`,
    price: 0,
    discount: 0,
    information: "",
    schedule: "",
    timeStart: "",
    stock: 0,
    status: "active",
    position: 0,
    slug: "",
    deleted: 0,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category_title: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://192.168.55.14:3000${systemConfig.prefixAdmin}/categories`
        );

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách danh mục");

        const data = await response.json();
        console.log("API response:", data);

        const categoryTitles = Array.isArray(data.data)
          ? data.data.map((category) => category.title)
          : [];

        setCate(categoryTitles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  const handleChange = (event, field) => {
    let value = event.target.value;
    if (["price", "discount", "stock"].includes(field)) {
      value = value ? Math.max(0, parseFloat(value)) : 0;
    }
    setTour((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    const newImages = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    });
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

    const newTour = {
      ...tour,
      code: tour.code || `TOUR${Math.floor(Math.random() * 1000000)}`,
      images: JSON.stringify(images),
      price: parseFloat(tour.price),
      discount,
      timeStart: tour.timeStart ? dayjs(tour.timeStart).toISOString() : null,
      stock: parseInt(tour.stock, 10),
      slug: tour.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    };

    try {
      const response = await fetch("http://192.168.55.14:3000/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi thêm mới tour: ${errorText}`);
      }

      setTour({
        title: "",
        code: `TOUR${Math.floor(Math.random() * 1000000)}`,
        price: 0,
        discount: 0,
        information: "",
        schedule: "",
        timeStart: "",
        stock: 1,
        status: "active",
        position: 1,
        slug: "",
        category_title: "",
      });

      setImages([]);
      alert("Tạo mới thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm tour:", error);
      alert(error.message || "Có lỗi xảy ra khi thêm tour!");
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
              <div className="mb-3">
                <label className="form-label">Danh mục Tour:</label>
                <select
                  className="form-control"
                  value={tour.category_title}
                  onChange={(e) => handleChange(e, "category_title")}
                >
                  {cates.map((cate, index) => (
                    <option key={index} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
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
                <label className="form-label">Thông tin:</label>
                <input
                  type="text"
                  className="form-control"
                  value={tour.information}
                  onChange={(e) => handleChange(e, "information")}
                />
              </div>

              {/* Hỗ trợ tải lên nhiều ảnh */}
              <div className="mb-3">
                <label className="form-label">Hình ảnh:</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                <div className="mt-3 d-flex flex-wrap">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Ảnh ${index + 1}`}
                      className="img-thumbnail m-2"
                      style={{ maxWidth: "150px", maxHeight: "150px" }}
                    />
                  ))}
                </div>
              </div>

              {/* Trạng thái: Active hoặc Disable */}
              <div className="mb-3">
                <label className="form-label">Trạng thái:</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="statusCheckbox"
                    checked={tour.status === "active"}
                    onChange={(e) =>
                      setTour((prev) => ({
                        ...prev,
                        status: e.target.checked ? "active" : "disable",
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="statusCheckbox">
                    {tour.status === "active" ? "Active" : "Disable"}
                  </label>
                </div>
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
