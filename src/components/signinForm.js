import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.scss";

const SignInForm = ({ setRole }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Đăng ký thất bại!");
      }

      const data = await response.json();
      const { token, role } = data;

      // Lưu token và role vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Cập nhật role vào App.js
      setRole(role);

      alert("Đăng ký thành công! Đang tự động đăng nhập...");
      navigate("/");
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại!");
    }

    setLoading(false);
  };

  return (
    <div id="container">
      <h1>Đăng ký tài khoản</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form id="formInput" onSubmit={handleSignUp}>
        <label className="labelInput">Họ và Tên</label>
        <input
          className="inputField"
          type="text"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <label className="labelInput">Xác nhận mật khẩu</label>
        <input
          className="inputField"
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button id="buttonInput" type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
