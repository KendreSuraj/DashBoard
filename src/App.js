import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LogIn from './pages/Login/LogIn';
import Layout from './components/layout/Layout';
import Profile from './pages/Profile/Profile';
import { routes } from './routes';
import Coupons from './pages/Coupons/Coupons';
import Packages from './pages/Packages/Packages';
import AdvancePayments from './pages/AdvancePayment/AdvancePayments';
import AddAdvancePayments from './pages/AdvancePayment/AddAdvancePayments';
import UserList from "./pages/Users/UserList"
import FAQ from './pages/FAQ/FAQ';
import ViewProductDetails from './pages/Product/ViewProductDetails';
import AddProductStepForm from './pages/Product/AddProductStepForm';
import { ViewCheckedIncentive } from './pages/Incentive/ViewCheckedIncentive';
import ViewUncheckedIncentive from './pages/Incentive/ViewUncheckedIncentive';
import BookingDetails from './pages/BookingDetails/BookingDetails';
import AddCoupon from './pages/Coupons/AddCoupon';
import VirtualConsultations from './pages/VirtualConsultations/VirtualConsultations';
import PrivateRoute from './PrivateRoute';
import AddUser from './pages/Users/AddUser';
import AddFAQ from './pages/FAQ/AddFAQ';
import AddPayment from './components/common/BookingComponent/AddPayment';
import AddEditMachineForm from './pages/Machine/AddEditMachineForm';
import AddEditPartnerForm from './pages/Partner/AddEditPartnerForm';
import AddEditCenterForm from './pages/Center/AddEditCenterForm';
import AddEditTherapistForm from './pages/Therapist/AddEditTherapistForm';
import AddMachineRequest from './pages/Machine/AddMachineRequest';
import AddTherapistUnavailability from './pages/Request/AddTherapistUnavailability.jsx';
import PackagesSteps from './pages/Packages/PackageStep/PackageSteps';
import TransactionHistory from './pages/AdvancePayment/TransactionHistory.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route element={<PrivateRoute Component={Layout} />}>
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
            <Route path="/packages/packagesteps" element={<PackagesSteps />} />

            <Route
              path="/virtual-consultations"
              element={<VirtualConsultations />}
            />
            <Route
              path="/user/add-user" element={<AddUser />} />
            <Route
              path="/faq"
              element={<FAQ />}
            />
            <Route path="/add-faq"
              element={<AddFAQ />} />
            <Route path="/add-booking-payment" element={<AddPayment />} />
            <Route path="/addedit-center" element={<AddEditCenterForm />} />
            <Route path="/addedit-machine" element={<AddEditMachineForm />} />
            <Route path="/addedit-partner" element={<AddEditPartnerForm />} />
            <Route path="/addedit-therapist" element={<AddEditTherapistForm />} />
            <Route path="/add-machine-request" element={<AddMachineRequest />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/addtherapist-unavailability" element={<AddTherapistUnavailability />} />
            <Route path="/advance-payments" element={<AdvancePayments />} />
            <Route path="/add-advance-payments" element={< AddAdvancePayments />} />
            <Route path="/transaction-history/:id" element={< TransactionHistory />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;