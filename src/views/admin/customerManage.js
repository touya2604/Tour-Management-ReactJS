import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "../../styles/UserManage.scss";
import * as systemConfig from "../../config/system";

const itemsPerPage = 6;

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/customers`
        );

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách khách hàng");

        const data = await response.json();
        setUsers(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.includes(search) || user.phone.includes(search);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id, status) => {
    if (status === "active") {
      alert("Không thể xóa người dùng có trạng thái Tốt!");
      return;
    }
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-manage">
      <div className="filter-box">
        <input
          type="text"
          placeholder="Nhập email/sđt"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="customer">Khách hàng</option>
        </select>
        {/* <FaSearch className="search-icon" /> */}
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
                <strong>Số điện thoại:</strong> {user.phone}
              </p>
              <p>
                <strong>Vai trò:</strong> {user.role}
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

export default UserManage;
