import React, { useState, useEffect } from "react";
import TourTest from "../../data/tourTest";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
const TourAdd = () => {
  const [tourTest, setTourTest] = useState([]);
  const [tour, setTour] = useState({
    name: "",
    price: "",
    capacity: 0,
    timestart: "",
    timeend: "",
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://your-api.com/tours");
        const data = await response.json();
        setTourTest(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setTourTest(TourTest);
      }
    };
    fetchTours();
  }, []);

  const handleChange = (event, field) => {
    setTour((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddNew = async () => {
    if (!tour.name || !tour.price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const tourNew = {
      name: tour.name,
      img: "",
      price: tour.price,
      capacity: tour.capacity,
      timestart: tour.timestart,
      timeend: tour.timeend,
    };

    try {
      const response = await fetch("https://your-api.com/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourNew),
      });
      const data = await response.json();
      setTourTest((prev) => [...prev, data]);
      setTour({ name: "", price: "", capacity: 0, timestart: "", timeend: "" });
      alert("Tạo mới thành công");
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  return (
    <>
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
                    value={tour.name}
                    onChange={(e) => handleChange(e, "name")}
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
            <button className="btn custom-color" onClick={handleAddNew}>
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourAdd;
