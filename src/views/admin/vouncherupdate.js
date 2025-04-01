import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/tourcrud.scss";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import * as systemConfig from "../../config/system";

const VoucherUpdate = () => {
  const [voucher, setTour] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/vouchers`
        );
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách vouncher");

        const data = await response.json();
        console.log("API response:", data);

        const filteredVouncher = Array.isArray(data.data)
          ? data.data.find((v) => String(v.id) === id) || null
          : null;

        setTour(filteredVouncher);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTours();
  }, [id]);

  const handleChange = (event, field) => {
    setTour((prev) => ({
      ...prev,
      [field]:
        field === "price" || field === "minAmount"
          ? parseFloat(event.target.value)
          : event.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (
      !voucher ||
      !voucher.status ||
      !voucher.discount ||
      !voucher.expire ||
      !voucher.minAmount
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const updatedTour = {
      ...voucher,
      expire: dayjs(voucher.expire).toISOString(),
      deletedAt: voucher.deletedAt
        ? dayjs(voucher.deletedAt).toISOString()
        : null,
      createdAt: voucher.createdAt
        ? dayjs(voucher.createdAt).toISOString()
        : null,
      updatedAt: voucher.updatedAt
        ? dayjs(voucher.updatedAt).toISOString()
        : null,
    };

    try {
      const response = await fetch(
        `http://localhost:3000${systemConfig.prefixAdmin}/vouchers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTour),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi cập nhật voucher: ${errorText}`);
      }

      alert("Cập nhật thành công!");
      navigate(`${systemConfig.prefixAdmin}/voucher-manage`);
    } catch (error) {
      console.error("Lỗi khi cập nhật voucher:", error);
      alert("Có lỗi xảy ra khi cập nhật voucher!");
    }
  };

  return (
    <>
      <div className="container mt-4 p-5 rounded custom-container">
        <div className="container p-4 rounded shadow-lg custom-border">
          <h1 className="text-center custom-text">Cập nhật Voucher</h1>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form>
                <div className="mb-3">
                  <label className="form-label">Trạng thái</label>
                  <input
                    type="text"
                    className="form-control"
                    value={voucher.status}
                    onChange={(e) => handleChange(e, "status")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giảm giá</label>
                  <input
                    type="number"
                    className="form-control"
                    value={voucher.discount}
                    onChange={(e) => handleChange(e, "discount")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời gian hết hạn</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={
                      voucher.expire
                        ? dayjs(voucher.expire).format("YYYY-MM-DDTHH:mm")
                        : ""
                    }
                    onChange={(e) => handleChange(e, "expire")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số tiền tối thiểu</label>
                  <input
                    type="number"
                    className="form-control"
                    value={voucher.minAmount}
                    onChange={(e) => handleChange(e, "minAmount")}
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

export default VoucherUpdate;
