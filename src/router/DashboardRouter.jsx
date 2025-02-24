import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../pages/Layout";
import AddMapping from "../pages/AddMapping";
import UploadTms from "../pages/UploadTms";
import XpathList from "../pages/XpathList";
import ClientConfig from "../pages/ClientConfig";
import Checklist from "../pages/Checklist";

const DashboardRouter = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/uploadScreen";

  return (
    <Routes>
      <Route path="/" element={<Layout hideHeader={hideHeader} />}>
        <Route index element={<ClientConfig />} />
        <Route path="uploadScreen" element={<UploadTms />} />
        <Route path="addMapping" element={<AddMapping />} />
        <Route path="addXpath" element={<XpathList />} />
        <Route path="checklist" element={<Checklist />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default DashboardRouter;
