import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddressForm from './component/form/AddressForm';
import VisaPayForm from "./component/form/VisaPayForm";
import PaymentMethod from "./component/method/PaymentMethod";
import ReviewOrder from "./component/review/ReviewOrder";
import ZaloPayForm from "./component/form/ZaloPayForm";
import ViettelPayForm from "./component/form/ViettelPayForm";
import PaymentPage from "./view/PaymentPage";
import axios from "axios"
axios.defaults.baseURL = "https://stark-shore-97814.herokuapp.com/api/onlinePay";

//Pages
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AddressForm />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/visa-form" element={<VisaPayForm />} />
                <Route path="/review-order" element={<ReviewOrder />} />
                <Route path="/zalo-form" element={<ZaloPayForm />} />
                <Route path="/viettel-form" element={<ViettelPayForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
