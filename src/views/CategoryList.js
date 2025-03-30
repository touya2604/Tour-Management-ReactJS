import React, { useState, useEffect } from "react";
import { Button, Pagination } from "react-bootstrap";
import "../styles/CategoryList.scss";
import * as systemConfig from "../config/system";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 5;

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
        `http://192.168.55.14:3000${systemConfig.prefixAdmin}/categories`
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
      <h2>Danh sách danh mục</h2>
      <Button
        variant="success"
        onClick={() => navigate(`${systemConfig.prefixAdmin}/cates-add`)}
      >
        Tạo
      </Button>
      <div className="grid-container">
        {displayedCategories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
            <Button
              variant="primary"
              onClick={() => navigate(`/tourDanhMuc/${category.title}`)}
            >
              Xem chi tiết
            </Button>
            <Button
              variant="warning"
              onClick={() =>
                navigate(
                  `${systemConfig.prefixAdmin}/cates-upd/${category.slug}`
                )
              }
            >
              Cập nhật
            </Button>
            <Button variant="danger">Xóa</Button>
          </div>
        ))}
      </div>

      <Pagination className="pagination">
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
