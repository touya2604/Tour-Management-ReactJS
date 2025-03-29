import React, { useState, useEffect } from "react";
import Management from "../../components/management";
import { Pagination } from "react-bootstrap";
import "../../styles/history.scss";
import Ph from "../../assets/images/placeholder.jpg";

const UserHistory = () => {
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
        const savedOrders =
          JSON.parse(localStorage.getItem("orderHistory")) || [];
        setTours(savedOrders);
      }
    };
    fetchTourHistory();
  }, []);

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  console.log(tours);
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
              {tours.map((order) => (
                <div key={order.id} className="order-card">
                  {order.items.map((tour) => (
                    <div key={tour.id} className="tour-card">
                      <img
                        src={tour.image || Ph}
                        alt={tour.name}
                        className="tour-image"
                      />
                      <h2 className="tour-title">{tour.name}</h2>
                      <p className="tour-info">Ngày đi: {tour.timestart}</p>
                      <p className="tour-info">
                        Tổng tiền: {tour.price.toLocaleString()} VNĐ
                      </p>
                    </div>
                  ))}
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
