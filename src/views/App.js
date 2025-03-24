import React from "react";
import logo from "../logo.svg";
import "../styles/App.css";
import HomePage from "./homepage";
import LogIn from "./logIn";
import SignIn from "./signIn";
import UserAccount from "./user-account";

class App extends React.Component {
  state = {
    check: "0",
    // 1 - Admin / 0 - Customer
  };
  render() {
    return (
      <>
        {/* <HomePage checkLog={this.state.check}></HomePage> */}
        {/* <LogIn></LogIn> */}
        {/* <SignIn></SignIn> */}
        <UserAccount checkAcc={this.state.check}></UserAccount>
      </>
    );
  }
}

export default App;
