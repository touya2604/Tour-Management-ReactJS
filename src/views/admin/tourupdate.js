import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";
import dayjs from "dayjs";

const TourUpdate = () => {
  const [tour, setTour] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://192.168.55.14:3000/tours`);
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");

        const data = await response.json();
        console.log("API response:", data);

        const filteredTour = Array.isArray(data.data)
          ? data.data.find((t) => t.slug === slug) || null
          : null;

        if (filteredTour) {
          try {
            filteredTour.images = JSON.parse(filteredTour.images);
            if (!Array.isArray(filteredTour.images)) {
              filteredTour.images = [];
            }
          } catch (e) {
            filteredTour.images = [];
          }
        }

        setTour(filteredTour);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTours();
  }, [slug]);

  const handleChange = (event, field) => {
    setTour((prev) => ({ ...prev, [field]: event.target.value }));
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
          setTour((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedTour = {
        ...tour,
        images: JSON.stringify(tour.images),
      };

      const response = await fetch(`http://192.168.55.14:3000/tours/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTour),
      });

      if (!response.ok) throw new Error("Lỗi khi cập nhật tour");

      alert("Cập nhật thành công!");
      navigate(`${systemConfig.prefixAdmin}/tour-manage`);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  if (!tour) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="container mt-4 p-5 rounded custom-container">
      <div className="container p-4 rounded shadow-lg custom-border">
        <h1 className="text-center custom-text">Cập nhật Tour</h1>
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
                  value={
                    tour.timeStart
                      ? dayjs(tour.timeStart).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
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
                <label className="form-label">Thông tin:</label>
                <input
                  type="text"
                  className="form-control"
                  value={tour.information}
                  onChange={(e) => handleChange(e, "information")}
                />
              </div>

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
                  {tour.images &&
                    tour.images.map((img, index) => (
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
        <button className="btn btn-primary mt-3" onClick={handleUpdate}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default TourUpdate;
