import * as React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import PageLayout from "../components/general/PageLayout";
import Loading from "../components/general/Loading";
import Sidebar from '../components/general/Sidebar';

const Dashboard = React.lazy(() => import('../components//dashboard/Dashboard'));
const Rules = React.lazy(() => import('../components/rules/Rules'));
const TermsList = React.lazy(() => import('../components/terms/TermsList'));

const styles = {
  success: { backgroundColor: 'blue' },
  error: { backgroundColor: 'purple' },
  warning: { backgroundColor: 'orange' },
  info: { backgroundColor: 'green' },
};

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
        classes={{
          variantSuccess: styles.success,
          variantError: styles.error,
          variantWarning: styles.warning,
          variantInfo: styles.info,
        }}
      >
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
                <TermsList />
              </React.Suspense>
            } />

            <Route path="/rules" element={
              <React.Suspense fallback={<Loading />}>
                <Rules />
              </React.Suspense>
            } />

          </Routes>
        </PageLayout>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default AllRoutes;