import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import logoVouncher from "../assets/images/logoFoot.png";
import "../styles/vouncher.scss";

const Vouncher = () => {
  const [vouncherList, setVouncherList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchVounchers = async () => {
      try {
        const response = await fetch("https://api.example.com/vouchers"); //Ông thay bằng API của ô ở đây nhé
        const data = await response.json();
        setVouncherList(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchVounchers();
  }, []);

  const totalPages = Math.ceil(vouncherList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const displayedVouncher = vouncherList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div id="gray-background">
        <div id="vouncher-list">
          <h1>Mã giảm giá</h1>
          {vouncherList.length === 0 ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <div id="vouncher-detail">
              {displayedVouncher.map((vouncher) => (
                <div key={vouncher.id} id="vouncher-item">
                  <img src={logoVouncher} alt="logoVouncher" />
                  <div>
                    <h2 className="vouncher-title">
                      Giảm tối đa: {vouncher.title}%
                    </h2>
                    <div>
                      <p className="vouncher-info">
                        Đơn tối thiểu: {vouncher.des1}
                      </p>
                      <p className="vouncher-info">
                        Hiệu lực sau: {vouncher.time} ngày
                      </p>
                    </div>
                  </div>
                  <button id="buttonUse">Dùng</button>
                </div>
              ))}
            </div>
          )}
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

export default Vouncher;
