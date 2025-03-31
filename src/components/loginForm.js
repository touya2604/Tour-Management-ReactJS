import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.scss";
import Cookies from "js-cookie";

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
      const response = await fetch(`http://192.168.55.2:3000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại!");
      }

      const data = await response.json();
      const { tokenUser, role } = data.data;
      Cookies.set("tokenUser", tokenUser, { expires: 7, secure: true });
      localStorage.setItem("role", role);

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại!");
    }

    setLoading(false);
  };

  return (
    <div id="container">
      <h1>Đăng nhập tài khoản</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form id="formInput" onSubmit={handleLogin}>
        <label className="labelInput">Email</label>
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
        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Quên mật khẩu?
        </p>

        <button id="buttonInput" type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
