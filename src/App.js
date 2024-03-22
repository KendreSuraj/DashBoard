import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LogIn from './pages/Login/LogIn';
import Layout from './components/layout/Layout';
import Profile from './pages/Profile/Profile';
import { routes } from './routes';
import Coupons from './pages/Coupons/Coupons';
import UserList from "./pages/Users/UserList"
import ViewProductDetails from './pages/Product/ViewProductDetails';
import AddProductStepForm from './pages/Product/AddProductStepForm';
import { ViewCheckedIncentive } from './pages/Incentive/ViewCheckedIncentive';
import ViewUncheckedIncentive from './pages/Incentive/ViewUncheckedIncentive';
import BookingDetails from './pages/BookingDetails/BookingDetails';
import AddCoupon from './pages/Coupons/AddCoupon';
import VirtualConsultations from './pages/VirtualConsultations/VirtualConsultations';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route element={<Layout />}>
            {routes}
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/viewproductdetails"
              element={<ViewProductDetails />}
            />
            <Route path="/coupons" element={<Coupons />} />
            <Route path='/users' element={<UserList />} />
            <Route path="/addproductstep" element={<AddProductStepForm />} />
            <Route
              path="/viewcheckedincentive"
              element={<ViewCheckedIncentive />}
            />
            <Route
              path="/viewuncheckedincentive"
              element={<ViewUncheckedIncentive />}
            />
            <Route
              path="/booking-details/:sessionScheduleId"
              element={<BookingDetails />}
            />
            <Route path="/add-coupon" element={<AddCoupon />} />
            <Route
              path="/virtual-consultations"
              element={<VirtualConsultations />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
