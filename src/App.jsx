import React from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import RoleDirect from './Component/RoleDirect.jsx';
import Landing from './Pages/Home/Landing'
import LoginForm from './Pages/Forms/LoginForm';
import SigninForm from './Pages/Forms/SigninForm';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import ApplyLeave from './Pages/Dashboard/ApplyLeave.jsx';
import LeaveHistory from './Pages/Dashboard/LeaveHistory.jsx';
import AdminDashboardLayout from './Pages/Admin Dashboard/AdminDashboardLayout.jsx';
import AdminDashboard from './Pages/Admin Dashboard/AdminDashboard.jsx';
import { Toaster } from 'react-hot-toast';
import AllLeaves from './Pages/Admin Dashboard/AllLeaves.jsx';
import UserHistory from './Pages/Admin Dashboard/UserHistory.jsx';
import ProtectedRoute from './Component/ProtectedRoutes.jsx';
import NotFound from './Component/NotFound.jsx';

function App() {

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signin' element={<SigninForm />} />

 {/* Dashboard routes for logged-in users */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
         <Route path="/dashboard" element={<RoleDirect />} />
          <Route path='/leave' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='apply' element={<ApplyLeave />} />
            <Route path='history' element={<LeaveHistory />} />
          </Route>
        </Route>


         {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/admin' element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='all-leaves' element={<AllLeaves />} />
            <Route path='user-history/:id' element={<UserHistory />} />
          </Route>
        </Route>

         <Route path="*" element={<NotFound />} />

      </Routes>


    </>
  )
}

export default App
