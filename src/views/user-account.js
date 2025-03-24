import React from "react";
import Header from "../components/header";
import Management from "../components/management";
class UserAccount extends React.Component {
  render() {
    let { checkAcc } = this.props;
    return (
      <>
        <Header checkLog={checkAcc}></Header>
        <Management checkAcc={checkAcc}></Management>
      </>
    );
  }
}
export default UserAccount;
