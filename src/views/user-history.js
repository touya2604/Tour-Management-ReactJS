import React, { useState, useEffect } from "react";
import Management from "../components/management";
import { Pagination } from "react-bootstrap";
import "../styles/history.scss";
import Ph from "../assets/images/placeholder.jpg";

const UserHistory = ({ checkAcc }) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchTourHistory = async () => {
      try {
        const response = await fetch("https://api.example.com/user-history"); // Thay API của ô vô
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử đặt tour:", error);
      }
    };
    fetchTourHistory();
  }, []);

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const displayedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div id="container-account">
        <Management
          user={{ email: "info@gmail.com", status: "Tốt", role: "Khách hàng" }}
        />
        <div id="right-bar">
          <h1 id="right-bar-top">Lịch sử đặt tour</h1>
          {tours.length === 0 ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <div id="right-bar-bottom-history">
              {displayedTours.map((tour) => (
                <div key={tour.id} className="tour-card">
                  <img
                    src={tour.image || Ph}
                    alt={tour.title}
                    className="tour-image"
                  />
                  <h2 className="tour-title">{tour.title}</h2>
                  <p className="tour-info">Ngày đi: {tour.dateStart}</p>
                  <p className="tour-info">Ngày về: {tour.dateEnd}</p>
                  <p className="tour-info">Giá: {tour.price}</p>
                </div>
              ))}
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
          )}
        </div>
      </div>
    </>
  );
};

export default UserHistory;
