import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import logoVouncher from "../../assets/images/logoFoot.png";
import "../../styles/vounchermanage.scss";
import vouchers from "../../data/vouncherTest";
import { useNavigate } from "react-router-dom";
import * as systemConfig from "../../config/system";
import dayjs from "dayjs";

const VouncherManage = () => {
  const [vouncherList, setVouncherList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchVounchers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/vouchers`
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          const validVouchers = data.data.filter(
            (item) => item.status !== "Deleted"
          );
          setVouncherList(validVouchers);
          setTotalPages(Math.ceil(validVouchers.length / itemsPerPage));
        } else {
          setVouncherList([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        const validVouchers = vouchers.filter(
          (item) => item.status !== "Deleted"
        );
        setVouncherList(validVouchers);
        setTotalPages(Math.ceil(validVouchers.length / itemsPerPage));
      } finally {
        setLoading(false);
      }
    };
    fetchVounchers();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải Vouncher...</div>;
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const deleteVoucher = (id) => async () => {
    // console.log("HI");
    const check = window.confirm("Có chắc rằng muốn xóa đi voucher này không");
    if (!check) {
      return;
    }
    const deletedVoucher = vouncherList.find((item) => item.id === id);

    try {
      const response = await fetch(
        `http://localhost:3000${systemConfig.prefixAdmin}/vouchers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...deletedVoucher, status: "Deleted" }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi cập nhật voucher: ${errorText}`);
      }
      alert("Xóa thành công");
      let newVouncherList = vouncherList.filter((item) => item.id !== id);
      setVouncherList(newVouncherList);
      setTotalPages(Math.ceil(newVouncherList.length / itemsPerPage));

      navigate(`${systemConfig.prefixAdmin}/vouchers`);
    } catch (error) {
      console.error("Lỗi khi cập nhật voucher:", error);
      alert("Có lỗi xảy ra khi cập nhật voucher!");
    }
  };

  const currentVouchers = vouncherList
    .filter((vouncher) => vouncher.status !== "Deleted")
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div id="gray-background">
        <div id="vouncher-list">
          <div id="vouncher-list-up">
            <h1>Mã giảm giá</h1>
            <button
              className="buttonUse"
              onClick={() => {
                navigate(`${systemConfig.prefixAdmin}/voucher-add`);
              }}
            >
              Tạo mới vouncher
            </button>
          </div>
          <div className="vouncher-list-up">
            {vouncherList.length === 0 ? (
              <p>Không có dữ liệu Vouncher.</p>
            ) : (
              <div id="vouncher-detail">
                {currentVouchers.map((vouncher) => (
                  <div key={vouncher.id} id="vouncher-item">
                    <div id="image-title">
                      <img src={logoVouncher} alt="logoVouncher" />
                      <div>
                        <h2 className="vouncher-title">
                          Giảm tối đa: {vouncher.discount}%
                        </h2>
                        <div>
                          {/* {console.log(typeof Number(vouncher.minAmount))} */}
                          {parseFloat(vouncher.minAmount) < 1.0 ? (
                            // {console.log(vouncher.minAmount)}
                            <>
                              <p className="vouncher-info">
                                Đơn tối thiểu: đ
                                {parseFloat(vouncher.minAmount) * 10}
                                00.000k
                              </p>
                            </>
                          ) : (
                            <p className="vouncher-info">
                              Đơn tối thiểu: đ{vouncher.minAmount}0.000tr
                            </p>
                          )}
                          <p className="vouncher-info">
                            Trạng thái: {vouncher.status}
                          </p>
                          <p className="vouncher-info">
                            Hết hạn sau:{" "}
                            {dayjs(vouncher.timeStart).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="Fix-Del">
                      <button
                        className="buttonUse"
                        onClick={() => {
                          navigate(
                            `${systemConfig.prefixAdmin}/voucher-update/${vouncher.id}`
                          );
                        }}
                      >
                        Cập nhật
                      </button>
                      <button
                        className="buttonUse"
                        onClick={deleteVoucher(vouncher.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {totalPages > 0 && (
            <Pagination className="pagination-custom">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default VouncherManage;
