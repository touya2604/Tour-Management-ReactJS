import "../styles/App.css";
import "../styles/homepage.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
class HomePage extends React.Component {
  state = {
    check: "1",
    // 1 - Admin / 0 - Customer
  };
  render() {
    return (
      <>
        <header>
          <Header checkLog={this.state.check} />
        </header>
        <main>
          <div id="box-container">
            <h1 id="TieuDeWeb">Khám phá thế giới cùng FMT</h1>
            <p id="GioiThieuWeb">
              Hành trình đáng nhớ đang chờ bạn! Đặt tour ngay để tận hưởng những
              trải nghiệm tuyệt vời.
            </p>
            <button
              id="buttonSubmit"
              type="submit"
              onClick={() => {
                console.log("Hello");
              }}
            >
              Đặt tour ngay
            </button>
            <form id="formInput">
              <input id="inputField" type="text" placeholder="Nhập điểm đến" />
              <button
                id="inputButton"
                type="button"
                onClick={() => {
                  console.log(document.getElementById("inputField").value);
                }}
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}

export default HomePage;
