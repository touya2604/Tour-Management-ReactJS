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
  useEffect(() => {
    const fetchVounchers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/vouchers`
        );
        const data = await response.json();
        setVouncherList(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setVouncherList(vouchers);
      } finally {
        setLoading(false);
      }
    };
    fetchVounchers();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải Vouncher...</div>;
  }

  const totalPages = Math.ceil(vouncherList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const deleteVoucher = (id) => {
    let newVouncherList = vouncherList.filter((item) => item.id !== id);
    setVouncherList(newVouncherList);
  };

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
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div id="vouncher-detail">
                {vouncherList.map((vouncher) => (
                  <div key={vouncher.id} id="vouncher-item">
                    <div id="image-title">
                      <img src={logoVouncher} alt="logoVouncher" />
                      <div>
                        <h2 className="vouncher-title">
                          Giảm tối đa: {vouncher.discount}%
                        </h2>
                        <div>
                          <p className="vouncher-info">
                            Đơn tối thiểu: đ{vouncher.minAmount}tr
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
                        onClick={() => deleteVoucher(vouncher.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        </div>
      </div>
    </>
  );
};

export default VouncherManage;
