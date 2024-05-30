
import './App.css';
import Home from './home/Home';
import ScrollToTop from "react-scroll-to-top";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from './footer/Footer';
import Patientlogin from './patients/Patientlogin';
import Patientsignup from './patients/Patientsignup';
import Hospital from './hospital/Hospital';
import Hospitallogin from './hospital/Hospitallogin';
import Doctorlogin from './doctor/Doctorlogin';
import Laboratory from './laboratory/Laboratory';
import Pharmacylogin from './pharmacy/Pharmacylogin';
import Hospitalsignup from './hospital/Hospitalsignup';
import Laboratorysignup from './laboratory/Laboratorysignup';
import Pharmacysignup from './pharmacy/Pharmacysignup';
import Doctorsignup from './doctor/Doctorsignup';
import Laboratorypage from './laboratory/Laboratorypage';
import Pharmacy from './pharmacy/Pharmacy';
import Doctor from './doctor/Doctor';
import Forgotpass from './forgotpassword/Forgotpass';
import Scrolltop from './scrolltop/Scrolltop';


function App() {

  return (
   <>
   <Router>
      <ScrollToTop smooth />
      <Scrolltop />
<Routes>

  <Route path='/' element={<Home />} />
  <Route path='/patient-login' element={<Patientlogin />} />
  <Route path='/patient-signup' element={<Patientsignup />} />
  <Route path='/hospital' element={<Hospital />} />
  <Route path='/hospital-login' element={<Hospitallogin />} />
  <Route path='/doctor-login' element={<Doctorlogin />} />
  <Route path='/laboratory-login' element={<Laboratory />} />
  <Route path='/pharmacy-login' element={<Pharmacylogin />} />
  <Route path='/hospital-signup' element={<Hospitalsignup />} />
  <Route path='/laboratory-signup' element={<Laboratorysignup />} />
  <Route path='/pharmacy-signup' element={<Pharmacysignup />} />
  <Route path='/doctor-signup' element={<Doctorsignup />} />
  <Route path='/laboratory' element={<Laboratorypage />} />
  <Route path='/pharmacy' element={<Pharmacy />} />
  <Route path='/doctor' element={<Doctor />} />
  <Route path='/forgotpassword' element={<Forgotpass />} />
  

 

</Routes> 
    <Footer />
</Router>
   
   </>
  );
}

export default App;
