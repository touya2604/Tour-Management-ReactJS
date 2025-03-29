import React, { useState, useEffect } from "react";
import VouncherTest from "../../data/vouncherTest";
import { useParams } from "react-router-dom";
const VouncherUpdate = () => {
  const [vouncher, setVouncher] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const vouncherId = Number(id);
    const UpdateVouncher = VouncherTest.find((t) => t.id === vouncherId);
    setVouncher(UpdateVouncher);
  }, [id]);
  const handleChange = (event, field) => {
    setVouncher((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch("https://api.example.com/update-vouncher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vouncher),
      });

      if (!response.ok) throw new Error("Lưu thất bại!");

      console.log("Lưu thành công:", vouncher);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
      const newVouncherTest = VouncherTest.map((item) =>
        item.id === vouncher.id ? { ...vouncher } : item
      );
      localStorage.setItem("newTour", JSON.stringify(newVouncherTest));
    } finally {
      console.log("Lưu thành công:", vouncher);
    }
  };

  return (
    <>
      <div className="container mt-4 p-5 rounded custom-container">
        <div className="container p-4 rounded shadow-lg custom-boder">
          <h1 className="text-center custom-text">Cập nhật Vouncher</h1>
          <div>
            <div className="col-md-6 mx-auto">
              <form>
                <div className="mb-3">
                  <label className="form-label">Phần trăm giảm giá</label>
                  <input
                    type="text"
                    className="form-control"
                    value={vouncher.percent}
                    onChange={(e) => handleChange(e, "percent")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số tiền tối thiểu</label>
                  <input
                    type="text"
                    className="form-control"
                    value={vouncher.minimum}
                    onChange={(e) => handleChange(e, "minimum")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian hiệu lực</label>
                  <input
                    type="date"
                    className="form-control"
                    value={vouncher.timeStart}
                    onChange={(e) => handleChange(e, "timeStart")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian hết hạn</label>
                  <input
                    type="date"
                    className="form-control"
                    value={vouncher.timeEnd}
                    onChange={(e) => handleChange(e, "timeEnd")}
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

export default VouncherUpdate;
