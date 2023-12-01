import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Pagenotfound from "./pages/Pagenotfound";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";

import CreateTeacher from "./pages/Admin/CreateTeacher";
import Teachers from './pages/Admin/Teachers';
import UpdateTeacher from "./pages/Admin/UpdateTeacher";
import TeacherDetail from "./pages/user/TeacherDetail";
import WrapElement from "./WrapElement";
import { useAuth } from "./context/auth";
import { useEffect, useState } from "react";
import Spinner from "./components/Layout/Spinner";
import WrapAdminElement from "./WrapAdminElement";
import axios from "axios";
import RateTeacher from "./pages/user/RateTeacher";
import Ratings from "./pages/Ratings";


function App() {

  const [initialized, setInitialized] = useState(false);

  const [auth] = useAuth()

  useEffect(() => {
    if (auth.isLoggedIn != undefined) {
      axios.defaults.headers.common['Authorization'] = auth.token

      setInitialized(true)
    }
  }, [auth])

  const isUser = auth?.user?.role === 0;

  return initialized ? <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tesst" element={<WrapElement>

      </WrapElement>} />

      <Route path="/dashboard" isExact element={<WrapElement>
        <Dashboard />
      </WrapElement>} />
      <Route path="/dashboard/admin" isExact element={<WrapAdminElement>
        <AdminDashboard />
      </WrapAdminElement>} />

      <Route path="/teacher/:slug/rate" element={<WrapElement>
        <RateTeacher />
      </WrapElement>} />

      <Route path="/teacher/:slug" element={<WrapElement>
        <TeacherDetail />
      </WrapElement>} />



      <Route path="/dashboard/user" element={<WrapElement>
        <Dashboard />
      </WrapElement>} />

      <Route path="/admin/create-teacher" element={<WrapAdminElement>
        <CreateTeacher />
      </WrapAdminElement>} />
      <Route path="/admin/teacher/:slug" element={<WrapAdminElement>
        <UpdateTeacher />
      </WrapAdminElement>} />
      <Route path="/admin/users" element={<WrapAdminElement>
        <Users />

      </WrapAdminElement>} />

      <Route path="/admin/dashboard/user/:slug" element={<WrapAdminElement>
        <Users />
      </WrapAdminElement>} />






      {/* <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="teacher/:slug" element={<TeacherDetail />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/create-teacher" element={<CreateTeacher />} />
        <Route path="admin/teacher/:slug" element={<UpdateTeacher />} />
        <Route path="admin/teachers" element={<Teachers />} />
      </Route> */}
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/ratings" element={<Ratings />} />

      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  </> : <Spinner />
}

export default App;
