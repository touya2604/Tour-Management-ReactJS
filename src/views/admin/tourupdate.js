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
        const response = await fetch(`http://192.168.55.7:3000/tours`);
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
      const response = await fetch(`http://192.168.55.7:3000/tours/${slug}`, {
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
                  value={tour.title || ""}
                  onChange={(e) => handleChange(e, "title")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Thời gian đi:</label>
                <input
                  type="datetime-local"
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
                  value={tour.price || ""}
                  onChange={(e) => handleChange(e, "price")}
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
                  value={tour.stock || ""}
                  onChange={(e) => handleChange(e, "stock")}
                />
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
