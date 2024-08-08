
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
import About from './about/About';
import Contact from './contact/Contact';
import Registration from './registration/Registration';
import Signup from './registration/Signup';
import Privacy from './privacy/Privacy';
import Terms from './privacy/Terms';
import Sterling from './hospitalpages/Sterling';
import Pharmacypage from './pharmacypages/Pharmacypage';
import Doctorpage from './doctorpages/Doctorpage';
import Labpage from './laboraotrypage/Labpage';
import Tellusmore from './home/Tellusmore';
import Camping from './camping/Camping';
import Patient from './inquity/Patient';
import DoctorInquiry from './inquity/Doctor';
import Blog from './Blog/Blog';
import Blogdetails from './Blog/Blogdetails';
import News from './News and midia/News';
import Awards from './about/Awards';
import Pragnancybloodtest from './Bloodtest/Pragnancybloodtest';
import Directors from './about/Directors';
import Bloodtestkid from './Bloodtest/Bloodtestkid';
import Fullbodycheckup from './Bloodtest/Fullbodycheckup';
import Seniorcitizenmale from './Bloodtest/Seniorcitizenmale';
import Seniorcitizenfemale from './Bloodtest/Seniorcitizenfemale';
import Swineflue from './Bloodtest/Swineflue';
import Serologytest from './Bloodtest/Serologytest';
import Pcodtest from './Bloodtest/Pcodtest';
import Igetest from './Bloodtest/Igetest';
import Center from './contact/Center';
import Feedback from './contact/Feedback';
import Centerdetails from './contact/Centerdetails';



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
  <Route path='/contact' element={<Contact />} />
  <Route path='/registration' element={<Registration />} />
  <Route path='/sign-up' element={<Signup />} />
  <Route path='/privacy-policies' element={<Privacy />} />
  <Route path='/terms-condition' element={<Terms />} />
  <Route path='/sterling-hospital' element={<Sterling />} />
  <Route path='/pharmacy-page' element={<Pharmacypage />} />
  <Route path='/patient-inquiry' element={<Patient />} />
  <Route path='/pharmacy-page' element={<Doctor />} />
  <Route path='/doctor-page' element={<Doctorpage />} />
  <Route path='/lab-page' element={<Labpage />} />
  <Route path='/tellusmore' element={<Tellusmore />} />
  <Route path='/camping' element={<Camping />} />
  <Route path='/cms/:_ID' element={<About />} />
  <Route path='/doctor-inquiry' element={<DoctorInquiry/> } />
  <Route path='/blog' element={<Blog/> } />
  <Route path='/blogdetails/:id' element={<Blogdetails/> } />
  <Route path='/news' element={<News/> } />
  <Route path='/awards' element={<Awards/> } />
  <Route path='/pregnancy-blood-test' element={<Pragnancybloodtest/> } />
  <Route path='/blood-test-kids' element={<Bloodtestkid/> } />
  <Route path='/full-body-checkup' element={<Fullbodycheckup/> } />
  <Route path='/senior-citizen-male' element={<Seniorcitizenmale/> } />
  <Route path='/senior-citizen-female' element={<Seniorcitizenfemale/> } />
  <Route path='/swine-flue' element={<Swineflue/> } />
  <Route path='/serology-blood-test' element={<Serologytest/> } />
  <Route path='/PCOD-pofile-blood-test' element={<Pcodtest/> } />
  <Route path='/ige-test' element={<Igetest/> } />
  <Route path='/Directors' element={<Directors/> } />
  <Route path='/center' element={<Center/> } />
  <Route path='/Feedback' element={<Feedback/> } />
  <Route path='/centerdetails/:id' element={<Centerdetails/> } />

 
</Routes> 
    <Footer />
</Router>
   
   </>
  );
}

export default App;
