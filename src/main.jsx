import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Setup buat make react-query
//  Dari dokumentasi

//"data" yang dimaksud adalah hasil dari permintaan query atau permintaan data spesifik yang dibuat dalam aplikasi
//yang menggunakan pustaka React Query atau alat serupa.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
