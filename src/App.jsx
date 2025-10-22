import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/Layout/Sidebar.jsx';
import Navbar from '@/components/Layout/Navbar.jsx';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Dashboard from '@/pages/Dashboard.jsx';
import FormUpload from "@/pages/FormUpload";
import StatusPengajuan from "@/pages/StatusPengajuan";
import ReviewDokumen from "@/pages/ReviewDokumen";
import UserManagement from "@/pages/UserManagement";
import ActivityLog from "@/pages/ActivityLog";




import "@/App.css";
import { AppProvider } from './context/AppContext';

const Layout = ({ children, pageTitle }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar pageTitle={pageTitle} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};


const getPageTitle = (pathname) => {
  const titleMap = {
    '/': 'Dashboard',
    '/pengajuan/form-upload': 'Formulir & Upload Dokumen',
    '/pengajuan/status': 'Status Pengajuan',
    '/verifikasi/review': 'Review Dokumen & Validasi',
    '/verifikasi/hasil': 'Hasil Review Teknis',
    '/users': 'Manajemen User',
    '/settings': 'Pengaturan Sistem',
    '/logs': 'Log Aktivitas'
  };
  return titleMap[pathname] || Dashboard;
};


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout pageTitle="Dashboard">
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/pengajuan/form-upload"
            element={
              <Layout pageTitle="Formulir & Upload Dokumen">
                <FormUpload />
              </Layout>
            }
          />
          <Route
            path="/pengajuan/status"
            element={
              <Layout pageTitle="Status Pengajuan">
                <StatusPengajuan />
              </Layout>
            }
          />
          <Route
            path="/verifikasi/review"
            element={
              <Layout pageTitle="Review Dokumen & Validasi">
                <ReviewDokumen />
              </Layout>
            }
          />
          <Route
            path="/verifikasi/hasil"
            element={
              <Layout pageTitle="Hasil Review Teknis">
                <StatusPengajuan />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout pageTitle="Manajemen User">
                <UserManagement />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout pageTitle="Pengaturan Sistem">
                <ActivityLog />
              </Layout>
            }
          />
          <Route
            path="/logs"
            element={
              <Layout pageTitle="Log Aktivitas">
                <ActivityLog />
              </Layout>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  );
}


export default App