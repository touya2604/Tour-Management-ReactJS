import React, { useState } from "react";
import TourTest from "../data/tourTest";
const TouRCRUD = () => {
  const [tourTest, setTourTest] = useState(TourTest);
  const [tour, setTour] = useState({
    name: "",
    price: "",
    capacity: 0,
    timestart: "",
    timeend: "",
  });
  const handleChange = (event, field) => {
    setTour((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddNew = () => {
    if (!tour.name || !tour.price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    let lastTour =
      tourTest.length > 0 ? tourTest[tourTest.length - 1] : { id: 0 };
    let tournew = {
      id: lastTour + 1,
      name: tour.name,
      img: "",
      price: tour.price,
      capacity: tour.capacity,
      timestart: tour.timestart,
      timeend: tour.timeend,
    };

    setTourTest((prev) => [...prev, tournew]);
    setTour({ name: "", price: "", capacity: 0, timestart: "", timeend: "" });
  };

  return (
    <>
      {console.log(tourTest)}
      <div id="gray-background">
        <div id="vouncher-list">
          <h1>Tạo mới Tour</h1>
          <div>
            <form>
              <label>Địa điểm: </label>
              <br />
              <input
                type="text"
                value={tour.name}
                onChange={(event) => handleChange(event, "name")}
              />
              <br />
              <label>Giá vé: </label>
              <br />
              <input
                type="text"
                value={tour.price}
                onChange={(event) => handleChange(event, "price")}
              />
              <br />
              <label>Thời gian đi: </label>
              <br />
              <input
                type="date"
                value={tour.timestart}
                onChange={(event) => handleChange(event, "timestart")}
              />
            </form>
            <form>
              <label>Số lượng khách: </label>
              <br />
              <input
                type="number"
                value={tour.capacity}
                onChange={(event) => handleChange(event, "capacity")}
              />
              <br />
              <label>Thời gian về: </label>
              <br />
              <input
                type="date"
                value={tour.timeend}
                onChange={(event) => handleChange(event, "timeend")}
              />
            </form>
            <button
              onClick={() => {
                handleAddNew();
              }}
            >
              Tạo mới
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TouRCRUD;
