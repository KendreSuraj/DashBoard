import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LogIn from './pages/Login/LogIn';
import Layout from './components/layout/Layout';
import Profile from './pages/Profile/Profile';
import { routes } from './routes';
import ViewProductDetails from './pages/Product/ViewProductDetails';
import AddProductStepForm from './pages/Product/AddProductStepForm';
import { ViewCheckedIncentive } from './pages/Incentive/ViewCheckedIncentive';
import ViewUncheckedIncentive from './pages/Incentive/ViewUncheckedIncentive';

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
            <Route path="/addproductstep" element={<AddProductStepForm />} />
            <Route path="/viewcheckedincentive" element={<ViewCheckedIncentive />} />
            <Route path="/viewuncheckedincentive" element={<ViewUncheckedIncentive />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
