// import AddressForm from "../component/form/AddressForm";
// import VisaPayForm from "../component/form/VisaPayForm";
// import ZaloPayForm from "../component/form/ZaloPayForm";
// import PaymentMethod from "../component/method/PaymentMethod";
// import Review from "../component/review/ReviewOrder";
// import { useState } from "react";

// function PaymentPage() {
//     const [show, setShow] = useState(1);
//     var userData;
//     const handleData = (data) => {
//         userData = data;
//         setShow(2);
//         console.log(show);
//         console.log(userData);
//     }

//     return (
//         <div>
//             <div style={{ visibility: show === 1 ? 'visible' : 'hidden' }}><AddressForm onSaveData={handleData}></AddressForm></div>
//             <div style={{ visibility: show === 2 ? 'visible' : 'hidden' }}><VisaPayForm></VisaPayForm></div>
//             <div style={{ visibility: show === 3 ? 'visible' : 'hidden' }}><ZaloPayForm></ZaloPayForm></div>
//             <div style={{ visibility: show === 4 ? 'visible' : 'hidden' }}><PaymentMethod></PaymentMethod></div>
//             <div style={{ visibility: show === 5 ? 'visible' : 'hidden' }}><Review userData={userData}></Review></div>
//         </div>
//     )
// };
// export default PaymentPage;