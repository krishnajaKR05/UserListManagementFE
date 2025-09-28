import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import LoginPage from "./Pages/LoginPage";
import ViewUsers from "./Pages/ViewUsers";

function App() {
  function RenderLoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
      const timer: NodeJS.Timeout = setTimeout(() => {
        navigate("/userMatrix/login");
      }, 3000);

      return () => clearTimeout(timer);
    }, [navigate]);

    return <WelcomePage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/userMatrix/">
          <Route index element={<RenderLoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="user/:id" element={<ViewUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
