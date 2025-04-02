import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.scss";
import * as systemConfig from "../config/system";

const SignInForm = () => {
  const [fullName, setFullName] = useState("");
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [phones, setPhones] = useState([]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000${systemConfig.prefixAdmin}/customers`
        );

        if (!response.ok) throw new Error("Lỗi khi lấy danh sách khách hàng");

        const data = await response.json();
        const User = Array.isArray(data.data) ? data.data : [];
        const UserPhone = User.map((pho) => pho.phone);
        const UserEmail = User.map((mail) => mail.email);
        console.log(UserEmail);
        setEmails(UserEmail);
        setPhones(UserPhone);
        // console.log(User);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (emails.includes(email)) {
      setError("Email đã tồn tại");
      setLoading(false);
      return;
    }
    if (phones.includes(phone)) {
      setError("Số điện thoại đã tồn tại");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
    if (!nameRegex.test(fullName)) {
      setError("Tên không được chứa số hoặc ký tự đặc biệt!");
      setLoading(false);
      return;
    }

    if (!phone.startsWith("0")) {
      setError("Số điện thoại phải bắt đầu bằng 0!");
      setLoading(false);
      return;
    }
    if (phone.length !== 10) {
      setError("Số điện thoại phải có 10 chữ số!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Đăng ký thất bại!");
      }

      alert("Đăng ký thành công!");
      navigate("/logIn");
    } catch (err) {
      alert("Đăng ký thất bại. Vui lòng thử lại!");
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
        <label className="labelInput">Email</label>
        <input
          className="inputField"
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="labelInput">Số điện thoại</label>
        <input
          className="inputField"
          type="text"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
