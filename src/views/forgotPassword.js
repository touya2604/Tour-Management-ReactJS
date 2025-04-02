import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const sendOtp = async () => {
    const res = await fetch("http://localhost:3000/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:3000/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (res.ok) setStep(3);
  };

  const resetPassword = async () => {
    const res = await fetch("http://localhost:3000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    if (res.ok) {
      setMessage("Mật khẩu đã được cập nhật!");
      setStep(1);
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Quên mật khẩu</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {step === 1 && (
        <>
          <p>Nhập email của bạn để nhận mã OTP.</p>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={sendOtp}>Gửi OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Nhập mã OTP được gửi đến email.</p>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Xác nhận</button>
        </>
      )}

      {step === 3 && (
        <>
          <p>Đặt lại mật khẩu.</p>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button onClick={resetPassword}>Xác nhận</button>
        </>
      )}

      <p className="back-to-login" onClick={() => navigate("/login")}>
        Quay lại đăng nhập
      </p>
    </div>
  );
};

export default ForgotPassword;
