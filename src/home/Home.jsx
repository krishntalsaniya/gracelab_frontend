import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoCheckmarkDoneSharp, IoLocationSharp, IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  CardBody,
  Button,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "../css/responsive.css";
import "../css/style.css";
import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";
import banner4 from "../img/banner4.jpg";
import banner5 from "../img/banner5.jpg";
import program1 from "../img/program1.jpg";
import program2 from "../img/program2.jpg";
import program3 from "../img/program3.jpg";
import icon1 from "../img/icon1.png";
import icon2 from "../img/icon2.png";
import icon3 from "../img/icon3.png";
import icon4 from "../img/icon4.png";
import icon5 from "../img/icon5.png";
import about from "../img/about.png";
import placeholderimage from "../img/placeholder.jpeg";
import Network from "./Network";
import Modalpopup from "./Modalpopup";
import Program from "./Program";
import Banner from "./Banner";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import axios from "axios";
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
import { useMediaQuery } from 'react-responsive';

function Home() {
 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

  const [bannerList, setBannerList] = useState([]);
  const [campList, setcampList] = useState([]);
  const [cmsdesc, setcmsdesc] = useState([]);
  const [Loyalty, setLoyalty] = useState([]);
  const [camp, setcamp] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 576) {
        setItemsPerSlide(1); // Mobile view
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(2); // Tablet view
      } else {
        setItemsPerSlide(3); // Desktop view
      }
    };

    updateItemsPerSlide(); // Initial check

    window.addEventListener('resize', updateItemsPerSlide);
    return () => {
      window.removeEventListener('resize', updateItemsPerSlide);
    };
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const CMScontent = async () => {
      try {
        const HomeCMScontent = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/blogs`
        );
      

        setcmsdesc(HomeCMScontent.data);
    
      } catch (error) {
        console.log("cms data   :", error);
      }
    };
    CMScontent();

    const Loyaltyimages = async () => {
      try {
        const Loyaltyimages = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/loyaltyimage`
        );
 

        setLoyalty(Loyaltyimages.data);
  
      } catch (error) {
        console.log("cms data   :", error);
      }
    };
    Loyaltyimages();

    const campdetails = async () => {
      try {
        const campdetails = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/Camps`,
          {
            skip: 0,
            per_page: 1000,
            sorton: "Date",
            sortdir: "desc",
            match: "",
            IsActive: true,
          }
        );
   

        setcamp(campdetails.data[0].data);
        
      } catch (error) {
        console.log("cms data   :", error);
      }
    };
    campdetails();
  }, []);

  useEffect(() => {
    const Homebannerimage = async () => {
      try {
        const Homebannerimage = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/banners`
        );
    

        const specilityisactive = Homebannerimage.data.filter(
          (specialityisactive) => specialityisactive.IsActive
        );
        setBannerList(specilityisactive);
  
      } catch (error) {
        console.log("Doctor Speciality error  :", error);
      }
    };
    Homebannerimage();

    const campsection = async () => {
      try {
        const campsection = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/listNearestUpcomingCamp`
        );
    

        const campsectionactive = campsection.data.filter(
          (campsectionactive) => campsectionactive.IsActive
        );
        setcampList(campsectionactive);
    
      } catch (error) {
        console.log("Doctor Speciality error  :", error);
      }
    };
    campsection();
  }, []);

  function handleLinkClick(item) {
    localStorage.setItem("selectedtellusmore", item);
  }

  function handleLinkClickmore(item) {
    localStorage.setItem("selectedNavItem", item);
  }
  localStorage.clear();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 600px) and (max-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  // Determine the number of items per slide
  // const itemsPerSlide = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;
  // Number of items per slide
const slideIndices = Array.from({ length: Math.ceil(camp.length / itemsPerSlide) }, (_, index) => index);
  

  // Calculate the number of slides needed
  const numSlides = Math.ceil(Loyalty.length / itemsPerSlide);

  
  const slideIndicesloyalti = Array.from({ length: numSlides }, (_, index) => index)

  return (
    <>
      <Modalnavigationbar />
      <Carousel>
        {bannerList.map((banner) => (
          <Carousel.Item key={banner._id} className="banner-carousal">
            <img
              src={`${process.env.REACT_APP_API_URL_GRACELAB}/${banner.bannerImage}`}
              alt={banner.Title}
            />
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

            <Link
              onClick={() => handleLinkClick("Join Our Network")}
              to="/tellusmore"
              className="btn btn-secondary"
            >
              Tell Us More
            </Link>
          </Card>
          <Row className="justify-content-center" id="homeindustry">
            <Col lg={3} md={6} sm={6}>
              <Link
                onClick={() => handleLinkClickmore("Laboratory")}
                to="/laboratory"
              >
                <Card className="single-services-box text-center">
                  <Card.Body>
                    <div className="icon">
                      <Image src={icon1} alt="Service Icon" />
                    </div>
                    <Card.Title className="networktitle">Laboratory</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <Link
                onClick={() => handleLinkClickmore("Pharmacy")}
                to="/pharmacy"
              >
                <Card className="single-services-box text-center">
                  <Card.Body>
                    <div className="icon">
                      <Image src={icon2} alt="Service Icon" />
                    </div>
                    <Card.Title className="networktitle">Pharmacy</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <Link onClick={() => handleLinkClickmore("Doctors")} to="/doctor">
                <Card className="single-services-box text-center">
                  <Card.Body>
                    <div className="icon">
                      <Image src={icon3} alt="Service Icon" />
                    </div>
                    <Card.Title className="networktitle">Doctor</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <Link
                onClick={() => handleLinkClickmore("Hospital")}
                to="/hospital"
              >
                <Card className="single-services-box text-center">
                  <Card.Body>
                    <div className="icon">
                      <Image src={icon4} alt="Service Icon" />
                    </div>
                    <Card.Title className="networktitle">Hospital</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <Link
                onClick={() => handleLinkClickmore("Patients")}
                to="/patient-login"
              >
                <Card className="single-services-box text-center">
                  <Card.Body>
                    <div className="icon">
                      <Image src={icon5} alt="Service Icon" />
                    </div>
                    <Card.Title className="networktitle">Patient</Card.Title>
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

            <Link
              onClick={() => handleLinkClick("Explore Our Camps")}
              to="/tellusmore"
              className="btn btn-secondary tell-us-more-btn"
            >
              Tell Us More
            </Link>
          </Card>

          {campList.map((upcoming, index) => (
            <Row key={index} className="align-items-center">
              <Col lg={6} md={12}>
                <div className="about-image">
                 <Link to="/camping">
                  <Image
                    src={`${process.env.REACT_APP_API_URL_GRACELAB}/${upcoming.Photo}`}
                    alt={
                      upcoming.placeholderimage
                        ? upcoming.title
                        : "Placeholder Image"
                    }
                  />
                 </Link>
                </div>
              </Col>
              <Col lg={6} md={12}>
                <div className="about-content">
                     <h5>
      <strong >Camp Venue: </strong>
  {(upcoming.CampVenueDetails?.Society || "").length > 30
    ? `${upcoming.CampVenueDetails.Society.substring(0, 30)}...`
    : upcoming.CampVenueDetails?.Society || ""}
</h5>
       <p>
  <strong>Date</strong>{` : ${upcoming.Date ? new Date(upcoming.Date).toISOString().split('T')[0] : ""}`}
</p>

        <p>{upcoming.Descreption || ""}</p>
         <Card.Text>
         <small style={{ fontWeight: 'bold', fontSize: '13px' }}>{`No Of Patient: ${upcoming.NoOfPatients}`}</small>

        </Card.Text>

                  <ul className="about-features-list">
                    
                    {upcoming.DoctorsDetails &&
                      upcoming.DoctorsDetails.map((doctor, index) => (
                       <li key={index} style={{ listStyle: "none", display: "flex", alignItems: "center" }}>
  <IoCheckmarkDoneSharp style={{ color: "#ffb923", marginRight: "8px" }} /> {/* Adjust margin-right as needed */}
  {doctor.DoctorName}
</li>

                      ))}
                  </ul>
                  <div className="btn-box">
                    <Link
                      to="https://gracelab.barodaweb.org/patient-inquiry"
                      target="_blank"
                      className="btn btn-primary btn-login"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
            {/* <Slider {...settings} className="mt-4">
      {camp.map((camping) => (
        <Link to="/camping" key={camping.id}>
          <Card className="camping-card">
            <Card.Img
              variant="top"
              src={`${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Photo}`}
              alt={
                camping.placeholderimage
                  ? camping.title
                  : "Placeholder Image"
              }
              onError={(e) => {
                e.target.src = placeholderimage;
              }}
              style={{ width: "100%", height: "auto" }}
            />
            <Card.Body className="card-home-camping">
              <Card.Title>{camping.title}</Card.Title>
              <Card.Text>
                {expandedDescriptions[camping._id]
                  ? camping.Descreption
                  : `${camping.Descreption.substring(0, 20)}...`}
                {camping.Descreption.length > 100 && (
                  <span
                    style={{ color: "#eb268f", cursor: "pointer" }}
                    onClick={() => toggleDescription(camping._id)}
                  >
                    {expandedDescriptions[camping._id]
                      ? " Read Less"
                      : " Read More"}
                  </span>
                )}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">{`No Of Patient: ${camping.NoOfPatients}`}</small>
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Doctors:</small>
                <ul>
                  {camping.DoctorsDetails &&
                    camping.DoctorsDetails.map((doctor, index) => (
                      <li key={index}>{doctor.DoctorName}</li>
                    ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Slider> */}



     <Carousel className="mt-4">
    {slideIndices.map((slideIndex) => (
      <Carousel.Item key={slideIndex}>
        <Row>
          {camp.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((camping, index) => (
            <Col key={index} lg={12 / itemsPerSlide} md={12 / itemsPerSlide} sm={12}>
              <Link to="/camping" key={camping.id}>
               <Card className="camping-card">
      <Card.Img
        className="card-camp-image"
        variant="top"
        src={`${process.env.REACT_APP_API_URL_GRACELAB}/${camping.Photo}`}
        alt={camping.title}
        onError={(e) => { e.target.src = placeholderimage }}
      />
      <Card.Body className="card-home-camping">
     <p>
      <strong style={{ fontSize: 'bold' }}>Camp Venue: </strong>
  {(camping.CampVenueDetails?.Society || "").length > 20
    ? `${camping.CampVenueDetails.Society.substring(0, 20)}...`
    : camping.CampVenueDetails?.Society || ""}
</p>

        <Card.Text>
   <p>
  <strong>Date</strong>{` : ${camping.Date ? new Date(camping.Date).toISOString().split('T')[0] : ""}`}
</p>


        </Card.Text>
        <Card.Text>
          <strong style={{ fontSize: 'bold' }}>Camp Desc: </strong>
          {expandedDescriptions[camping._id]
            ? camping.Descreption
            : `${camping.Descreption.substring(0, 100)}...`}
          {camping.Descreption.length > 100 && (
            <span
              style={{ color: '#eb268f', cursor: 'pointer' }}
              onClick={() => toggleDescription(camping._id)}
            >
              {expandedDescriptions[camping._id] ? ' Read Less' : ' Read More'}
            </span>
          )}
        </Card.Text>
        <Card.Text>
         <small style={{ fontWeight: 'bold', fontSize: '13px' }}>{`No Of Patient: ${camping.NoOfPatients}`}</small>

        </Card.Text>
        <Card.Text>
          <small className="text-muted" style={{ fontWeight: 'bold'}}>Doctors:</small>
          <div className="row">
            {camping.DoctorsDetails &&
              camping.DoctorsDetails.map((doctor, index) => (
               <div className="col-6 col-lg-6" key={index}>
                  <li>{doctor.DoctorName}</li>
                </div>
              ))}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    ))}
  </Carousel>
        </Container>
      </section>

      {/* about section start */}

      {/* loyalty program */}

      <section className="boxes-area ptb-70 pb-3">
        <Container>
          <Card className="section-title">
            <span>Loyalty PROGRAM</span>
            <h2> Join Our Loyalty Program</h2>

            <Link
              onClick={() => handleLinkClick("Join Our Loyalty Program")}
              to="/tellusmore"
              className="btn btn-secondary"
            >
              Tell Us More
            </Link>
          </Card>
          <Row>
            {/* {Loyalty.map((image, index) => (
        <Col key={index} lg={4} md={6} sm={6}>
          <div className="single-box p-0">
            <img src={`${process.env.REACT_APP_API_URL_GRACELAB}/${image.bannerImage}`} alt={image.placeholderimage ? image.title : 'Placeholder Image'}/>
          </div>
        </Col>
      ))} */}
           <Carousel className="mt-4" controls={Loyalty.length > itemsPerSlide}>
      {slideIndicesloyalti.map((slideIndex) => (
        <Carousel.Item key={slideIndex}>
          <Row>
            {Loyalty.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map(
              (image, index) => (
                <Col key={index} lg={12 / itemsPerSlide} md={12 / itemsPerSlide} sm={12 / itemsPerSlide}>
                  <div className="single-box p-0 loylti-program">
                    <img
                      className="d-block w-100"
                      src={`${process.env.REACT_APP_API_URL_GRACELAB}/${image.bannerImage}`}
                      alt={image.title ? image.title : "Placeholder Image"}
                      onError={(e) => {
                        e.target.src = placeholderimage; // Ensure placeholderimage is defined
                      }}
                    />
                  </div>
                </Col>
              )
            )}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
          </Row>
        </Container>
      </section>

      <section className="about-area ptb-40">
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
                  Grace Medical Services Private Limited has top notch fully
                  automated laboratory that are barcoded with international
                  quality standards. When you trust us with your patient samples
                  for health checking, you can be rest assured that you will
                  only get accurate results. And to top it all, grace performs
                  test right from simple blood test to master health check ups
                  at its designated lab and we have trained and capable
                  phlebotomist to collect blood samples of patients either at
                  lab or at home or at respective doctor clinic/nursing
                  home/hospitals. Grace Medical Services Private Limited are
                  based on practical and expected needs of the medical
                  practitioner and the patients which includes it’s services
                  like 24*7, being genuine , speed creation and delivery of
                  reports with excellent team of pathologist, doctor centric,
                  it’s mobile app and most important to ensure utter pleasant
                  satisfaction to patients. The availability of reports are
                  seamless to Doctors and patients vide sms, email and thru
                  Grace Medical Services Private Limited mobile app.
                </p>
                <ul className="about-features-list">
                  <li>
                    <IoCheckmarkDoneSharp style={{ color: "#ffb923" }} />{" "}
                    Streamlined Operations
                  </li>
                  <li>
                    <IoCheckmarkDoneSharp style={{ color: "#ffb923" }} />{" "}
                    Patient Loyalty Rewards
                  </li>
                  <li>
                    <IoCheckmarkDoneSharp style={{ color: "#ffb923" }} />{" "}
                    Multi-Facility Redemption
                  </li>
                  <li>
                    <IoCheckmarkDoneSharp style={{ color: "#ffb923" }} />{" "}
                    Enhanced Patient Satisfaction
                  </li>
                </ul>
                <div className="btn-box">
                  <Link
                    to="/cms/667e52387a043e58372e16ce"
                    className="btn btn-primary btn-login"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
