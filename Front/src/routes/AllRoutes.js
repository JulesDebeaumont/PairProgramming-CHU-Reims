import * as React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Loading from "../components/Loading";
import Sidebar from '../components/Sidebar';

const Dashboard = React.lazy(() => import('../components/Dashboard'));
const Rules = React.lazy(() => import('../components/Rules'));
const Terms = React.lazy(() => import('../components/Terms'));

export function AllRoutes() {
  return (
    <BrowserRouter>
      <Sidebar />
      <PageLayout>
        <Routes>

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={
            <React.Suspense fallback={<Loading />}>
              <Dashboard />
            </React.Suspense>
          } />

          <Route path="/terms" element={
            <React.Suspense fallback={<Loading />}>
              <Terms />
            </React.Suspense>
          } />

          <Route path="/rules" element={
            <React.Suspense fallback={<Loading />}>
              <Rules />
            </React.Suspense>
          } />

        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default AllRoutes;