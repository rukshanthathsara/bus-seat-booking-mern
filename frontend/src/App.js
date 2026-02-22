import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Confirmation from "./pages/Confirmation";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import RouteSchedules from "./pages/RouteSchedules";
import Footer from "./components/Footer";




function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/route/:routeId" element={<RouteSchedules />} />


        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>


        <Route
          path="/book/:scheduleId"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
        />



        <Route path="/confirmation" element={<Confirmation />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
