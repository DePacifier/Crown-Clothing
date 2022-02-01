import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

// Page Imports
import HomePage from "./pages/home/home.page";
import ShopPage from "./pages/shop/shop.page";
import LoginPage from "./pages/login/login.component";

// Layout and Component Imports
import Header from "./components/header/header.component";

function App() {
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

export default App;
