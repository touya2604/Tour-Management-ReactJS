import React from "react";
import Header from "../components/header";
import SignInForm from "../components/signinForm";

class SignIn extends React.Component {
  render() {
    return (
      <>
        <Header></Header>
        <SignInForm></SignInForm>
      </>
    );
  }
}

export default SignIn;
