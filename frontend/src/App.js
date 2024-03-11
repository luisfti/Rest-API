import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CustomersProfile from "./pages/customers/profile.component";
import CustomersForm from "./pages/customers/form.component";
import CustomersList from "./pages/customers/list.component";
import Navbar from "./components/navbar.component";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<CustomersList />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/add" element={<CustomersForm />} />
              <Route path="/customer/:id" element={<CustomersProfile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
