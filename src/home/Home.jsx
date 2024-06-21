import React,{useEffect,useState} from 'react'



import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { IoCheckmarkDoneSharp,IoLocationSharp  ,IoCall  } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { Container, Row,Col ,Image} from 'react-bootstrap';
import Carousel  from 'react-bootstrap/Carousel';
import '../css/responsive.css';
import '../css/style.css';
import banner1 from '../img/banner1.jpg';
import banner2 from '../img/banner2.jpg';
import banner3 from '../img/banner3.jpg';
import banner4 from '../img/banner4.jpg';
import banner5 from '../img/banner5.jpg';
import program1 from '../img/program1.jpg';
import program2 from '../img/program2.jpg';
import program3 from '../img/program3.jpg';
import icon1 from '../img/icon1.png'
import icon2 from '../img/icon2.png'
import icon3 from '../img/icon3.png'
import icon4 from '../img/icon4.png'
import icon5 from '../img/icon5.png'
import about from '../img/about.png'
import Network from './Network';
import Modalpopup from './Modalpopup';
import Program from './Program';
import Banner from './Banner';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import axios from 'axios';



function Home() {
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    const Homebannerimage = async() =>
      {
       try {
        const Homebannerimage = await axios.get
        (
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/banners`
        );
        console.log("show baneer images :", Homebannerimage);

        const specilityisactive = Homebannerimage.data.filter(
          (specialityisactive) => specialityisactive.IsActive
        );          
        setBannerList(specilityisactive)
        console.log("specilityisactive",specilityisactive);
       } catch (error) {
        console.log("Doctor Speciality error  :", error)
       }
        
      }
      Homebannerimage();


  
   
  }, [])
  

  return (
    <>
    <Modalnavigationbar  />
    <Carousel>
      {bannerList.map(banner => (
        <Carousel.Item key={banner._id}>
          <img src={`${process.env.REACT_APP_API_URL_GRACELAB}/${banner.bannerImage}`} alt={banner.Title} />
        </Carousel.Item>
      ))}
    </Carousel>


 {/* carousal start */}
            
{/* start service section */}

<section className="services-area ptb-70 pb-5 bg-fff7f4">
      <Container>
        <Program
          title="Network"
          heading="Join Our Network"
          headinglinktitle="Tell Us More"
          headinglink="/"
        />
        <Row className="justify-content-center" id="homeindustry">
          <Network
            networkimage={icon1}
            networktitle="Laboratory"
            networklink="/laboratory-login"
          />
          <Network
            networkimage={icon2}
            networktitle="Pharmacy"
            networklink="/Pharmacy-login"
          />
          <Network
            networkimage={icon3}
            networktitle="Doctors"
            networklink="/doctor-login"
          />
          <Network
            networkimage={icon4}
            networktitle="Hospitals"
            networklink="/hospital-login"
          />
          <Network
            networkimage={icon5}
            networktitle="Patients"
            networklink="/patient-login"
          />
        </Row>
      </Container>
    </section>

{/* box area start */}

<section className="boxes-area ptb-70 pb-3">
      <Container>
        <Program
          title="LOYALTY PROGRAM"
          heading="Join Our Loyalty Program"
          headinglinktitle="Tell Us More"
          headinglink="/"
        />
        <Row className="justify-content-center">
          <Banner
            baneerimg={program1}
          />
          <Banner
            baneerimg={program2}
          />
          <Banner
            baneerimg={program3}
          />
        </Row>
      </Container>
    </section>

{/* about section start */}


<section className="about-area ptb-70">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12}>
            <div className="about-image">
              <Image src={about} alt="image" />
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="about-content">
              <span>About Us</span>
              <h2>Welcome to Grace Labs</h2>
              <p>
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
              </p>
              <p>
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
              </p>
              <ul className="about-features-list">
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Streamlined Operations</li>
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Patient Loyalty Rewards</li>
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Multi-Facility Redemption</li>
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Enhanced Patient Satisfaction</li>
              </ul>
              <div className="btn-box">
                <Link to="/about" className="btn btn-primary">Learn More</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

 </>
  )
}

export default Home