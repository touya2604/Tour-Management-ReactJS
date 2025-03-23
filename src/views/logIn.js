import React from "react";
import Header from "../components/header";
import LoginForm from "../components/loginForm";
import "../styles/sign.scss";

class LogIn extends React.Component {
  render() {
    return (
      <>
        <Header />
        <LoginForm />
      </>
    );
  }
}

export default LogIn;
