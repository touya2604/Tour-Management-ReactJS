import React, { useState, useEffect } from "react";
import VouncherTest from "../../data/vouncherTest";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
const VouncherAdd = () => {
  const [vouncherTest, setVouncherTest] = useState([]);
  const [vouncher, setVouncher] = useState({
    percent: "",
    minimum: "",
    timeStart: "",
    timeEnd: "",
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://your-api.com/tours");
        const data = await response.json();
        setVouncherTest(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setVouncherTest(VouncherTest);
      }
    };
    fetchTours();
  }, []);

  const handleChange = (event, field) => {
    setVouncher((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddNew = async () => {
    if (!vouncher.name || !vouncher.price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const vouncherNew = {
      percent: vouncher.percent,
      minimum: vouncher.minimum,
      timeStart: vouncher.timeStart,
      timeEnd: vouncher.timeEnd,
    };

    try {
      const response = await fetch("https://your-api.com/vouncher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vouncherNew),
      });
      const data = await response.json();
      setVouncherTest((prev) => [...prev, data]);
      setVouncher({
        percent: "",
        minimum: "",
        timeStart: "",
        timeEnd: "",
      });
      alert("Tạo mới thành công");
    } catch (error) {
      console.error("Error adding vouncher:", error);
    }
  };

  return (
    <>
      <div className="container mt-4 p-5 rounded custom-container">
        <div className="container p-4 rounded shadow-lg custom-boder">
          <h1 className="text-center custom-text">Tạo mới Vouncher</h1>
          <div>
            <div className="col-md-6 mx-auto">
              <form>
                <div className="mb-3">
                  <label className="form-label">Phần trăm giảm giá</label>
                  <input
                    type="text"
                    className="form-control"
                    value={vouncher.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số tiền tối thiểu</label>
                  <input
                    type="text"
                    className="form-control"
                    value={vouncher.timestart}
                    onChange={(e) => handleChange(e, "timestart")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian hiệu lực</label>
                  <input
                    type="date"
                    className="form-control"
                    value={vouncher.price}
                    onChange={(e) => handleChange(e, "price")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian hết hạn</label>
                  <input
                    type="date"
                    className="form-control"
                    value={vouncher.capacity}
                    onChange={(e) => handleChange(e, "capacity")}
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

export default VouncherAdd;
