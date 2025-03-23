import React from "react";

class LoginForm extends React.Component {
  render() {
    return (
      <>
        <div id="container">
          <h1>Đăng nhập tài khoản</h1>
          <form id="formInput">
            <label className="labelInput">Email/SĐT</label>
            <input
              className="inputField"
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
            />
            <label className="labelInput">Mật khẩu</label>
            <input
              className="inputField"
              type="password"
              placeholder="Nhập mật khẩu"
            />
            <button id="buttonInput" type="button">
              Đăng Nhập
            </button>
            <p>
              Chưa có tài khoản ? <a href="hi">Đăng ký</a>
            </p>
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
