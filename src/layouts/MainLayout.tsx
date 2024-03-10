import React from "react";
import { Header } from "../components/header/Header";
import { Outlet } from "react-router-dom";
export const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
