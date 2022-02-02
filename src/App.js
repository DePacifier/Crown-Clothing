import React from "react";
import { Routes, Route } from "react-router-dom";

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
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Routes>
          <Route element={<Header currentUser={this.state.currentUser} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="signin" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
