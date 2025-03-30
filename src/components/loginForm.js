import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.scss";
import * as systemConfig from "../config/system";
import md5 from "md5";

const LoginForm = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://192.168.55.14:3000${systemConfig.prefixAdmin}/customers`
      );
      if (!response.ok) throw new Error("Không thể lấy dữ liệu người dùng");

      const data = await response.json();
      const users = data.data || [];

      // Mã hóa mật khẩu để so sánh
      const hashedPassword = md5(password);

      // Kiểm tra xem email và mật khẩu có khớp không
      const user = users.find(
        (u) => u.email === email && u.password === hashedPassword
      );

      if (!user) {
        throw new Error("Email hoặc mật khẩu không chính xác");
      }

      // Lưu thông tin vào localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userEmail", user.email);

      // Cập nhật role vào App.js
      setRole(user.role);

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div id="container">
      <h1>Đăng nhập tài khoản</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form id="formInput" onSubmit={handleLogin}>
        <label className="labelInput">Email/SĐT</label>
        <input
          className="inputField"
          type="text"
          placeholder="Nhập email hoặc số điện thoại"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="labelInput">Mật khẩu</label>
        <input
          className="inputField"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button id="buttonInput" type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
