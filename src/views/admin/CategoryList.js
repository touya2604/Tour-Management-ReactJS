import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "../../styles/CategoryList.scss";
import * as systemConfig from "../../config/system";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 4;

const CategoryList = () => {
  const [cates, setCate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000${systemConfig.prefixAdmin}/categories`
      );
      if (!response.ok) throw new Error("Lỗi khi lấy danh sách danh mục");

      const data = await response.json();
      setCate(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(cates.length / itemsPerPage);
  const displayedCategories = cates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="category-list">
      <div className="title-add">
        <h2>Danh sách danh mục</h2>
        <button
          className="btn btn-success buttonUse"
          id="button-add"
          onClick={() => navigate(`${systemConfig.prefixAdmin}/cates-add`)}
        >
          Tạo tour mới
        </button>
      </div>
      <div className="grid-container">
        {displayedCategories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
            <button
              className="btn btn-primary buttonUse"
              onClick={() => navigate(`/tourDanhMuc/${category.title}`)}
            >
              Xem chi tiết
            </button>
            <button
              class="btn btn-warning buttonUse"
              onClick={() =>
                navigate(
                  `${systemConfig.prefixAdmin}/cates-upd/${category.slug}`
                )
              }
            >
              Cập nhật
            </button>
            <button className="btn btn-danger buttonUse">Xóa</button>
          </div>
        ))}
      </div>

      <Pagination className="pagination-custom">
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => setCurrentPage(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default CategoryList;
