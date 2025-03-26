import React from "react";

class SignInForm extends React.Component {
  render() {
    return (
      <>
        <div id="container">
          <h1>Đăng ký tài khoản</h1>
          <form id="formInput">
            <label className="labelInput">Họ và Tên</label>
            <input
              className="inputField"
              type="text"
              placeholder="Nhập họ và tên"
            />
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
            <label className="labelInput">Xác nhận mật khẩu</label>
            <input
              className="inputField"
              type="password"
              placeholder="Nhập lại mật khẩu"
            />
            <button id="buttonInput" type="button">
              Đăng ký
            </button>
          </form>
        </div>
      </>
    );
  }
}
export default SignInForm;
