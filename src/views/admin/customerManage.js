import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "../../styles/UserManage.scss";
import * as systemConfig from "../../config/system";

const itemsPerPage = 3;

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          `http://192.168.55.7:3000${systemConfig.prefixAdmin}/customers`
        );

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách tour");

        const data = await response.json();
        console.log("API response:", data);

        // setTours(Array.isArray(data) ? data : []);
        // setFilteredTours(Array.isArray(data) ? data : []);
        setUsers(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchTours();
  }, []);
  const filteredUsers = users.filter(
    (user) => user.email.includes(search) || user.phone.includes(search)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id, status) => {
    if (status === "Tốt") {
      alert("Không thể xóa người dùng có trạng thái Tốt!");
      return;
    }
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-manage">
      <div className="search-box">
        <input
          type="text"
          placeholder="Nhập email/sđt"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="user-list">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="user-card">
            <FaUserCircle className="avatar" />
            <div className="user-info">
              <p>
                <strong>Họ và tên:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>SDT:</strong> {user.phone}
              </p>
              <p>
                <strong>Trạng thái:</strong> {user.status}
              </p>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(user.id, user.status)}
              disabled={user.status === "Tốt"}
            >
              Xóa người dùng
            </button>
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

export default UserManage;
