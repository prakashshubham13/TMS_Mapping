import React from "react";
import { Route, Routes } from "react-router-dom";  // Removed unused Router import
import Layout from "../pages/Layout";
import AddMapping from "../pages/AddMapping";
import UploadTms from "../pages/UploadTms";
import XpathList from "../pages/XpathList";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UploadTms />} />
        <Route path="addMapping" element={<AddMapping />} />
        <Route path="addXpath" element={<XpathList />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default DashboardRouter;
