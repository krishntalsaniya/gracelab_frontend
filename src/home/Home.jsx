import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { IoCheckmarkDoneSharp,IoLocationSharp  ,IoCall  } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { Container, Row,Col ,Image,Card,CardBody,Button} from 'react-bootstrap';
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
import placeholderimage from '../img/placeholder.jpeg'
import Network from './Network';
import Modalpopup from './Modalpopup';
import Program from './Program';
import Banner from './Banner';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";




function Home() {
 var settings = {
     dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Scroll one card every 5 seconds
    cssEase: 'linear',
    // pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [bannerList, setBannerList] = useState([]);
  const [cmsdesc, setcmsdesc] = useState([])
  const [camp, setcamp] = useState([])

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


    const campdetails = async() =>
      {
       try {
        const campdetails = await axios.post
        (
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/Camps`,
          {
             
          skip: 0,
          per_page: 1000,
          sorton: "Date",
          sortdir: "desc",
          match:"",
          IsActive: true,
        }
         
        );
        console.log("show camp details:", campdetails.data[0].data);

              
        setcamp(campdetails.data[0].data)
        console.log("show camp details this  ",campdetails.data);
       } catch (error) {
        console.log("cms data   :", error)
       }
        
      }
      campdetails();
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
    
    <span>CAMPS PROGRAM</span>
    <h2> Explore Our Camps</h2>
 
  <Link onClick={() => handleLinkClick('Explore Our Camps')} to='/tellusmore' className="btn btn-secondary">Tell Us More</Link>
</Card>
   <Slider {...settings}>
     
       {camp.map((camping) => (
           <Link to='/camping'> <Card key={camping.id} style={{ width: '18rem', margin: '0 auto' }}>
              <Card.Img variant="top" src={`${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Photo}`} alt={camping.placeholderimage ? camping.title : 'Placeholder Image'}
              onError={(e) => { e.target.src = placeholderimage }}
              style={{ width: '100%', height: 'auto' }} />
              <Card.Body className='card-body-camping'>
                <Card.Title>{camping.title}</Card.Title>
                <Card.Text>
                  {`Description: ${camping.Descreption}`}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">{`No Of Patient: ${camping.NoOfPatients}`}</small>
                </Card.Text>
                 <Card.Text>
              <small className="text-muted">Doctors:</small>
              <ul>
                {camping.DoctorsDetails && camping.DoctorsDetails.map((doctor, index) => (
                  <li key={index}>{doctor.DoctorName}</li>
                ))}
              </ul>
            </Card.Text>
             
              </Card.Body>
            </Card>
            </Link>
          ))}
    
    </Slider>
      </Container>
    </section>

{/* about section start */}

{/* loyalty program */}

<section className="boxes-area ptb-70 pb-3">
      <Container>
         <Card className="section-title">
    
    <span>Loyalty PROGRAM</span>
    <h2> Join Our Loyalty Program</h2>
 
  <Link onClick={() => handleLinkClick('Join Our Loyalty Program')} to='/tellusmore' className="btn btn-secondary">Tell Us More</Link>
</Card>
  
      </Container>
    </section>


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