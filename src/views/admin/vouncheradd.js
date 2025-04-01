import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
import dayjs from "dayjs";
import * as systemConfig from "../../config/system";
import { useNavigate } from "react-router-dom";
const VouncherAdd = () => {
  const [vouncher, setVouncher] = useState({
    id: 0,
    discount: 0,
    minAmount: 0,
    expire: "",
    status: "Active",
    deleted: 0,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const navigate = useNavigate();
  const handleChange = (event, field) => {
    setVouncher((prev) => ({
      ...prev,
      [field]:
        field === "discount" || field === "minAmount"
          ? parseFloat(event.target.value)
          : event.target.value,
    }));
  };

  const handleAddNew = async () => {
    if (!vouncher.discount || !vouncher.minAmount || !vouncher.expire) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newVouncher = {
      id: null, // Thêm id: null nếu backend yêu cầu
      ...vouncher,
      expire: dayjs(vouncher.expire).toISOString(),
    };

    try {
      const response = await fetch(
        `http://localhost:3000${systemConfig.prefixAdmin}/vouchers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVouncher),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi thêm mới voucher: ${errorText}`);
      }

      setVouncher({
        discount: 0,
        minAmount: 0,
        expire: "",
        status: "Active",
        deleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("Tạo mới thành công!");
      navigate(`${systemConfig.prefixAdmin}/vouchers`);
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
      alert("Có lỗi xảy ra khi thêm voucher!");
    }
  };

  return (
    <>
      <div className="container mt-4 p-5 rounded custom-container">
        <div className="container p-4 rounded shadow-lg custom-boder">
          <h1 className="text-center custom-text">Tạo mới Voucher</h1>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form>
                <div className="mb-3">
                  <label className="form-label">Phần trăm giảm giá</label>
                  <input
                    type="number"
                    className="form-control"
                    value={vouncher.discount}
                    onChange={(e) => handleChange(e, "discount")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số tiền tối thiểu</label>
                  <input
                    type="number"
                    className="form-control"
                    value={vouncher.minAmount}
                    onChange={(e) => handleChange(e, "minAmount")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian hết hạn</label>
                  <input
                    type="date"
                    className="form-control"
                    value={vouncher.expire}
                    onChange={(e) => handleChange(e, "expire")}
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
