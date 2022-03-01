import * as React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import PageLayout from "../components/general/PageLayout";
import LoadingScreen from "../components/general/LoadingScreen";
import Sidebar from '../components/general/Sidebar';


const Dashboard = React.lazy(() => import('../components//dashboard/Dashboard'));
const TermsList = React.lazy(() => import('../components/terms/TermsList'));
const RulesList = React.lazy(() => import('../components/rules/RulesList'));
const RuleEdition = React.lazy(() => import('../components/rules/RuleEdition'));
const Page404 = React.lazy(() => import('../components/general/Page404'));


export function AllRoutes() {
  return (
    <BrowserRouter>
      <Sidebar />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <PageLayout>
          <Routes>

            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/dashboard" element={
              <React.Suspense fallback={<LoadingScreen />}>
                <Dashboard />
              </React.Suspense>
            } />

            <Route path="/terms" element={
              <React.Suspense fallback={<LoadingScreen />}>
                <TermsList />
              </React.Suspense>
            } />

            <Route path="/rules" element={
              <React.Suspense fallback={<LoadingScreen />}>
                <RulesList />
              </React.Suspense>
            } />

            <Route path="/rules/new" element={
              <React.Suspense fallback={<LoadingScreen />}>
                <RuleEdition />
              </React.Suspense>
            } />

            <Route path="/rules/:id/edit" element={
              <React.Suspense fallback={<LoadingScreen />}>
                <RuleEdition />
              </React.Suspense>
            } />

            <Route path="*" element={
              <React.Suspense fallback={<LoadingScreen />}>
                <Page404 />
              </React.Suspense>
            } />

          </Routes>
        </PageLayout>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default AllRoutes;