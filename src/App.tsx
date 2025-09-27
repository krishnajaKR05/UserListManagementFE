import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import LoginPage from "./Pages/LoginPage";
import ViewUsers from "./Pages/ViewUsers";
import ManageUser from "./Components/ManageUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/userMatrix/">
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="user/:id" element={<ViewUsers />} />
                    <Route path="manageuser" element={<ManageUser />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
