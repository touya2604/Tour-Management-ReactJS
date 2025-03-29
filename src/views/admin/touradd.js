import React, { useState, useEffect } from "react";
import TourTest from "../../data/tourTest";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
const TourAdd = () => {
  const [tourTest, setTourTest] = useState([]);
  const [tour, setTour] = useState({
    title: "",
    code: "",
    images: "",
    price: 0,
    discount: 0,
    information: "",
    schedule: "",
    timeStart: "",
    stock: 0,
    status: "",
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
      title: tour.title,
      code: tour.code,
      images: tour.images,
      price: tour.price,
      discount: tour.discount,
      information: tour.information,
      schedule: tour.schedule,
      timeStart: tour.timeStart,
      stock: tour.stock,
      status: tour.status,
    };

    try {
      const response = await fetch("https://your-api.com/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourNew),
      });
      const data = await response.json();
      setTourTest((prev) => [...prev, data]);
      setTour({
        title: "",
        code: "",
        images: "",
        price: 0,
        discount: 0,
        information: "",
        schedule: "",
        timeStart: "",
        stock: 0,
        status: "",
      });

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
                    value={tour.stock}
                    onChange={(e) => handleChange(e, "stock")}
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
