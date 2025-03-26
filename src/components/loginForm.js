import React, { useState } from "react";
import axios from "axios";
import "../styles/sign.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      alert("Đăng nhập thành công!");
      console.log("Token:", response.data.token); // Lưu token nếu cần
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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
