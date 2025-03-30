import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";
import dayjs from "dayjs";

const TourUpdate = () => {
  const [tour, setTour] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.55.14:3000/tours/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tour),
      });

      if (!response.ok) throw new Error("Lỗi khi cập nhật tour");

      alert("Cập nhật thành công!");
      navigate(`${systemConfig.prefixAdmin}/tour-manage`);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTour((prev) => ({ ...prev, images: reader.result }));
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
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
                  onChange={handleImageUpload}
                />
                {previewImage && (
                  <div className="mt-3">
                    <img
                      src={previewImage}
                      alt="Ảnh xem trước"
                      className="img-fluid rounded"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                )}
              </div>
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
