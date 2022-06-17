import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components";
import Login from "./features/Login/pages/Login";
import Mark from "./features/Mark/pages/Mark";
import Products from "./features/Products/pages/Products";
import AddEditProgram from "./features/Programs/pages/AddEditProgram/AddEditProgram";
import Programs from "./features/Programs/pages/Programs/Programs";
import Report from "./features/Report/pages/Report";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Programs/Add" element={<AddEditProgram />} />
          <Route path="/Programs/Edit/:programId" element={<AddEditProgram />} />
          <Route path="/Programs" element={<Programs />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Mark" element={<Mark />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
