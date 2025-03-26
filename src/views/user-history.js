import React, { useState } from "react";
import Management from "../components/management";
import Header from "../components/header";
import { Pagination } from "react-bootstrap";
import "../styles/history.scss";
import Ph from "../assets/images/placeholder.jpg";
const UserHistory = ({ checkAcc }) => {
  let tours = [
    {
      id: 1,
      title: "HÀ NỘI – LÀO CAI – SA PA",
      dateStart: "14/2/2022",
      dateEnd: "17/2/2022",
      price: "4.790.000 VND",
      image: Ph,
    },
    {
      id: 2,
      title: "ĐÀ NẴNG – HỘI AN – RỪNG DỪA BẢY MẪU – BÀ NÀ",
      dateStart: "14/10/2022",
      dateEnd: "17/10/2022",
      price: "3.200.000 VND",
      image: Ph,
    },
    {
      id: 3,
      title: "PHÚ QUỐC",
      dateStart: "20/2/2024",
      dateEnd: "24/2/2024",
      price: "4.290.000 VND",
      image: Ph,
    },
    {
      id: 4,
      title: "NHA TRANG - VINPEARL LAND",
      dateStart: "10/6/2023",
      dateEnd: "15/6/2023",
      price: "5.200.000 VND",
      image: Ph,
    },
  ];

  let itemsPerPage = 3;
  let [currentPage, setCurrentPage] = useState(1);
  let totalPages = Math.ceil(tours.length / itemsPerPage);

  let handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  let displayedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header checkLog={checkAcc} />
      <div id="container-account">
        <Management
          user={{ email: "info@gmail.com", status: "Tốt", role: "Khách hàng" }}
        />
        <div id="right-bar">
          <h1 id="right-bar-top">Lịch sử đặt tour</h1>
          <div id="right-bar-bottom">
            {displayedTours.map((tour) => (
              <div key={tour.id} className="tour-card">
                <img src={tour.image} alt={tour.title} className="tour-image" />
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
        </div>
      </div>
    </>
  );
};

export default UserHistory;
