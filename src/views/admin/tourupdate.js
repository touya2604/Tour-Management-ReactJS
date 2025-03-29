import React, { useEffect, useState } from "react";
import tourTest from "../../data/tourTest";
import { useParams } from "react-router-dom";
const TourUpdate = () => {
  const [tour, setTour] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const tourId = Number(id);
    const UpdateTour = tourTest.find((t) => t.id === tourId);
    setTour(UpdateTour);
  }, [id]);
  const handleChange = (event, field) => {
    setTour((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch("https://api.example.com/update-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tour),
      });

      if (!response.ok) throw new Error("Lưu thất bại!");

      console.log("Lưu thành công:", tour);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
      const newTourTest = tourTest.map((item) =>
        item.id === tour.id ? { ...tour } : item
      );
      localStorage.setItem("newTour", JSON.stringify(newTourTest));
    } finally {
      console.log("Lưu thành công:", tour);
    }
  };

  return (
    <>
      <div className="container mt-4 p-5 rounded custom-container">
        <div className="container p-4 rounded shadow-lg custom-boder">
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
                    value={tour.timestart}
                    onChange={(e) => handleChange(e, "timestart")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giá vé:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tour.price}
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
                    value={tour.capacity}
                    onChange={(e) => handleChange(e, "capacity")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian về:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={tour.timeend}
                    onChange={(e) => handleChange(e, "timeend")}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn custom-color" onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourUpdate;
