import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tour.scss";
// import * as systemConfig from "../config/system";
import { Pagination } from "react-bootstrap";
const TourList = () => {
  const itemsPerPage = 6;
  const [tours, setTours] = useState([]);
  // const [cates, setCate] = useState([]);

  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tours`);

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");

        const data = await response.json();
        console.log("API response:", data);

        // setTours(Array.isArray(data) ? data : []);
        // setFilteredTours(Array.isArray(data) ? data : []);
        setTours(
          Array.isArray(data.data)
            ? data.data.map((tour) => ({
                ...tour,
                images: JSON.parse(tour.images),
              }))
            : []
        );

        setFilteredTours(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    let filtered = tours.filter((tour) =>
      tour?.title?.toLowerCase().includes(search.toLowerCase())
    );

    filtered = filtered.filter(
      (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    if (sortType === "asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortType === "desc") filtered.sort((a, b) => b.price - a.price);

    setFilteredTours(filtered);
    setCurrentPage(1);
  }, [search, sortType, priceRange, tours]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="tour-list-container">
      <div className="filter-section">
        <input
          className="search-box"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-options">
          <button onClick={() => setSortType("asc")}>Giá tăng dần</button>
          <button onClick={() => setSortType("desc")}>Giá giảm dần</button>
        </div>
        <div className="price-filter">
          <input
            type="range"
            min="0"
            max="10000000"
            step="50000"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <p>Từ {priceRange[0].toLocaleString()} VNĐ </p>
          <input
            type="range"
            min="0"
            max="10000000"
            step="50000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
          <p>{priceRange[1].toLocaleString()} VNĐ</p>
        </div>
      </div>
      <div className="tour-grid">
        {loading ? (
          <p className="loading">Đang tải...</p>
        ) : filteredTours.length > 0 ? (
          filteredTours
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((tour) => (
              <div
                key={tour.id}
                className="tour-card"
                onClick={() => navigate(`/tour/${tour.id}`)}
              >
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="tour-image"
                />
                <div className="tour-info">
                  <h3 className="tour-title">{tour.title}</h3>
                  <p className="tour-price">
                    Giá: {tour.price.toLocaleString()} VNĐ
                  </p>
                  <p className="tour-price">Số lượng: {tour.stock} người</p>
                  <button
                    className="detail-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tour/detail/${tour.slug}`);
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="no-results">Không có tour nào phù hợp.</p>
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
  );
};

export default TourList;
