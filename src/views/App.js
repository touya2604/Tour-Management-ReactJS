import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import LogIn from "./logIn";
import SignIn from "./signIn";
import UserAccount from "./user-account";
import UserHistory from "./user-history";
import Tour from "./tour";
import Contact from "./contact";
import News from "./newsletter";
import Cart from "./cart";
import Vouncher from "./vouncher";
class App extends React.Component {
  state = {
    check: "0", // 1 - Admin / 0 - Customer
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage checkLog={this.state.check} />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/user-account"
            element={<UserAccount checkAcc={this.state.check} />}
          />
          <Route
            path="/user-history"
            element={<UserHistory checkAcc={this.state.check} />}
          />
          <Route path="/tour" element={<Tour checkAcc={this.state.check} />} />
          <Route
            path="/contact"
            element={<Contact checkAcc={this.state.check} />}
          />
          <Route
            path="/newsletter"
            element={<News checkAcc={this.state.check} />}
          />
          <Route path="/cart" element={<Cart checkAcc={this.state.check} />} />
          <Route
            path="/vouncher"
            element={<Vouncher checkAcc={this.state.check} />}
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
