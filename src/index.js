import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/authenPage/loginPage";
import { storageKeys } from "./constants/storage";
import * as Storage from "./utils/storage";
import RegisterPage from "./pages/authenPage/registerPage";
import VerificationPage from "./pages/authenPage/verification";
import ConfimSuccessPage from "./pages/authenPage/confimSuccess";
import ResetPasswordPage from "./pages/authenPage/resetPasswordPage";
import VerificationMethods from "./pages/authenPage/verificationMethods";
import Dashboard from "./pages/dashboard/dashboard";
import PageNotFound from "./pages/pageNotFound";
import Income from "./pages/income/income";
import Expense from "./pages/expense/expense";
import AllReport from "./pages/allReport";
import Account from "./pages/settings/account";
import ManageCategory from "./pages/settings/manageCategory";
import Currency from "./pages/settings/currency";
import PaymentMethod from "./pages/settings/paymentMethod";

const root = ReactDOM.createRoot(document.getElementById("root"));

let user = Storage.getJson(storageKeys.USER)

root.render(
  <Router>
    <Routes>
      <Route element={user ? <App /> : <Navigate to="/login" /> }>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/income" element={<Income user={user} />} />
        <Route path="/expenses" element={<Expense user={user} />} />
        <Route path="/all-reports" element={<AllReport user={user} />} />
        <Route path="/account" element={<Account user={user} />} />
        <Route path="/manage-category" element={<ManageCategory user={user} />} />
        <Route path="/currency" element={<Currency user={user} />} />
        <Route path="/payment-menthod" element={<PaymentMethod user={user} />} />
      </Route>
      <Route element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} user={user}/>
        <Route path="/verification" element={<VerificationPage user={user}/>} />
        <Route path="/confirmSuccess" element={<ConfimSuccessPage />} />
        <Route path="/forget-password" element={<ResetPasswordPage />} />
        <Route path="/verification-methods" element={<VerificationMethods />} />
      </Route>
      <Route element={<App />}>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
