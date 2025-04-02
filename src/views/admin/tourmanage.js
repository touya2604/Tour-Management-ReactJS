import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "../../styles/tourmanage.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as systemConfig from "../../config/system";

const TourManage = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tours`);
        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");

        const data = await response.json();
        console.log("API response:", data);

        setTours(
          Array.isArray(data.data)
            ? data.data.map((tour) => ({
                ...tour,
                images: JSON.parse(tour.images),
              }))
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchTours();
  }, []);

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
  const deleteItem = (slug) => async () => {
    const check = window.confirm("Có chắc rằng muốn xóa đi Tour này không");
    if (!check) {
      return;
    }
    const deletedTour = tours.find((item) => item.slug === slug);
    const sanitizedTour = {
      ...deletedTour,
      images: Array.isArray(deletedTour.images)
        ? deletedTour.images.join(", ")
        : typeof deletedTour.images === "object"
        ? JSON.stringify(deletedTour.images)
        : deletedTour.images,
    };
    try {
      const response = await fetch(
        `http://localhost:3000${systemConfig.prefixAdmin}/tours/${slug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sanitizedTour, status: "Deleted" }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lỗi khi cập nhật voucher: ${errorText}`);
      }
      alert("Xóa thành công");
      let updateTour = tours.filter((item) => item.slug !== slug);
      setTours(updateTour);
    } catch (error) {
      console.error("Lỗi khi xóa Tour:", error);
      alert("Có lỗi xảy ra khi xóa Tour");
    }
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
            <button
              className="buttonUse"
              onClick={() => {
                navigate(`${systemConfig.prefixAdmin}/tour-add`);
              }}
            >
              Thêm mới tour
            </button>
          </div>
          <div id="vouncher-list-down">
            {tours.length === 0 ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <div id="vouncher-detail">
                {displayedTour.map((tour) => (
                  <div key={tour.id} id="vouncher-item">
                    <div id="image-title">
                      <img src={tour.images} alt="img" />
                      <div>
                        <h2 className="vouncher-title">{tour.title}</h2>
                        <div>
                          <p className="vouncher-info">
                            Số lượng người: {tour.stock} người
                          </p>
                          <p className="vouncher-info">
                            Giá vé: {tour.price.toLocaleString()} VNĐ
                          </p>
                          <p className="vouncher-info">
                            Trạng thái: {tour.status}
                          </p>
                          <p className="vouncher-info">
                            Thời gian đi:{" "}
                            {dayjs(tour.timeStart).format("DD/MM/YYYY HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="Fix-Del">
                      <button
                        className="buttonUse"
                        onClick={() => {
                          navigate(
                            `${systemConfig.prefixAdmin}/tour-update/${tour.slug}`
                          );
                        }}
                      >
                        Cập nhật
                      </button>
                      <button
                        className="buttonUse"
                        onClick={deleteItem(tour.slug)}
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

export default TourManage;
