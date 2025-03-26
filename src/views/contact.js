import React from "react";
import Header from "../components/header";

class Contact extends React.Component {
  render() {
    let { checkAcc } = this.props;
    return (
      <>
        <Header checkLog={checkAcc} />
      </>
    );
  }
}

export default Contact;
