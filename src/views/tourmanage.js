import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import Ph from "../assets/images/placeholder.jpg";
import "../styles/tourmanage.scss";
import tourTest from "../data/tourTest";
import { useNavigate } from "react-router-dom";
const TourManage = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3;
  const navigate = useNavigate;
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://api.example.com/vouchers"); //Ông thay bằng API của ô ở đây nhé
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error(error);
        setTours(tourTest);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return <div className="loading">Đang tải Vouncher...</div>;
  }

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const displayedTour = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div id="gray-background">
        <div id="vouncher-list">
          <div id="vouncher-list-up">
            <h1>Quản lý tour </h1>
            <button className="buttonUse">Thêm mới tour</button>
          </div>
          <div id="vouncher-list-down">
            {tours.length === 0 ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div id="vouncher-detail">
                {displayedTour.map((tour) => (
                  <div key={tour.img} id="vouncher-item">
                    <div id="image-title">
                      <img src={Ph} alt="img" />
                      <div>
                        <h2 className="vouncher-title">{tour.name}</h2>
                        <div>
                          <p className="vouncher-info">
                            Số lượng người: {tour.capacity} người
                          </p>
                          <p className="vouncher-info">
                            Giá vé: {tour.price.toLocaleString()} VNĐ
                          </p>
                          <p className="vouncher-info">
                            Thời gian đi: {tour.timestart}
                          </p>
                          <p className="vouncher-info">
                            Thời gian về: {tour.timeend}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="Fix-Del">
                      <button className="buttonUse">Cập nhật</button>
                      <button className="buttonUse">Xóa</button>
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

export default TourManage;
