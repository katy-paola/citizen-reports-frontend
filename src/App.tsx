import "./shared/styles/report.css";
import "./shared/styles/components.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ReportsPage } from "./features/reports/ReportsPage";
import { LoginPage } from "./features/auth/LoginPage";
import { AdminPage } from "./features/admin/AdminPage";

import { AdminRoute } from "./shared/AdminRoute";
import { NonAdminRoute } from "./shared/NonAdminRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/reports" replace />} />

            <Route element={<NonAdminRoute />}>
              <Route path="/reports" element={<ReportsPage />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            <Route element={<NonAdminRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
