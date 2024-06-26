import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { IoCheckmarkDoneSharp,IoLocationSharp  ,IoCall  } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { Container, Row,Col ,Image,Card} from 'react-bootstrap';
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
  const [cmsdesc, setcmsdesc] = useState([])

     useEffect(() => {
    
    const CMScontent = async() =>
      {
       try {
        const HomeCMScontent = await axios.get
        (
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/blogs`
        );
        console.log("show CMS content:", HomeCMScontent.data);

              
        setcmsdesc(HomeCMScontent.data)
        console.log("cms data in about us ",HomeCMScontent.data);
       } catch (error) {
        console.log("cms data   :", error)
       }
        
      }
      CMScontent();
  }, [])

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

    function handleLinkClick(item) {
  localStorage.setItem('selectedtellusmore', item);
}

  function handleLinkClickmore(item) {
  localStorage.setItem('selectedNavItem', item);
}
  

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
      <Card className="section-title">
    
    <span>Network</span>
    <h2>Join Our Network</h2>
 
  <Link onClick={() => handleLinkClick('Join Our Network')} to='/tellusmore' className="btn btn-secondary">Tell Us More</Link>
</Card>
        <Row className="justify-content-center" id="homeindustry">
          <Col lg={3} md={6} sm={6}>
      <Link onClick={() => handleLinkClickmore('Laboratory')} to='/laboratory-login'>
        <Card className="single-services-box text-center">
          <Card.Body>
            <div className="icon">
            <Image src={icon1} alt="Service Icon" />
            </div>
            <Card.Title className='networktitle'>Laboratory</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
            <Col lg={3} md={6} sm={6}>
      <Link onClick={() => handleLinkClickmore('Pharmacy')} to='/pharmacy-login'>
        <Card className="single-services-box text-center">
          <Card.Body>
            <div className="icon">
            <Image src={icon2} alt="Service Icon" />
            </div>
            <Card.Title className='networktitle'>Pharmacy</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
           <Col lg={3} md={6} sm={6}>
      <Link onClick={() => handleLinkClickmore('Doctors')} to='/doctor-login'>
        <Card className="single-services-box text-center">
          <Card.Body>
            <div className="icon">
            <Image src={icon3} alt="Service Icon" />
            </div>
            <Card.Title className='networktitle'>Doctor</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
            <Col lg={3} md={6} sm={6}>
      <Link onClick={() => handleLinkClickmore('Hospital')} to='/hospital-login'>
        <Card className="single-services-box text-center">
          <Card.Body>
            <div className="icon">
            <Image src={icon4} alt="Service Icon" />
            </div>
            <Card.Title className='networktitle'>Hospital</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
          <Col lg={3} md={6} sm={6}>
      <Link onClick={() => handleLinkClickmore('Patients')} to='/patient-login'>
        <Card className="single-services-box text-center">
          <Card.Body>
            <div className="icon">
            <Image src={icon5} alt="Service Icon" />
            </div>
            <Card.Title className='networktitle'>Patient</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
        </Row>
      </Container>
    </section>

{/* box area start */}

<section className="boxes-area ptb-70 pb-3">
      <Container>
         <Card className="section-title">
    
    <span>LOYALTY PROGRAM</span>
    <h2>Join Our Loyalty Program</h2>
 
  <Link onClick={() => handleLinkClick('Join Our Loyalty Program')} to='/tellusmore' className="btn btn-secondary">Tell Us More</Link>
</Card>
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
              {cmsdesc.map((link)=>(
                  <Link to={`/about/${link._id}`} className="btn btn-primary">Learn More</Link>
              ))}
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