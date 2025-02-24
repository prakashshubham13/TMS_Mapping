import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = ({ hideHeader }) => {
  return (
    <>
      {!hideHeader && <Header />}
      <div
        style={{
          background: "rgba(0,0,0,0.1)",
          height: "calc( 100vh - 6vh )",
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
