import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://192.168.55.2:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP đã gửi, vui lòng kiểm tra email.");
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Lỗi khi gửi yêu cầu!");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://192.168.55.2:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Xác nhận OTP thành công! Chuyển đến trang đặt lại mật khẩu.");
        navigate("/reset-password");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Lỗi khi xác thực OTP!");
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Quên mật khẩu</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {step === 1 ? (
        <form onSubmit={handleSendOtp}>
          <p>Nhập email của bạn để nhận mã OTP.</p>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Gửi OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <p>Nhập mã OTP được gửi đến email.</p>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Xác nhận</button>
        </form>
      )}

      <p className="back-to-login" onClick={() => navigate("/login")}>
        Quay lại đăng nhập
      </p>
    </div>
  );
};

export default ForgotPassword;
