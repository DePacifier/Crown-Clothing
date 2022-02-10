import React from "react";
import { Routes, Route } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

// Page Imports
import HomePage from "./pages/home/home.page";
import ShopPage from "./pages/shop/shop.page";
import LoginPage from "./pages/login/login.component";

// Layout and Component Imports
import Header from "./components/header/header.component";

// Firebase Util Imports
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser({ userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="signin" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
