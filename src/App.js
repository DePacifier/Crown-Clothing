import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/home/home.page";
import ShopPage from "./pages/shop/shop.page";

import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
