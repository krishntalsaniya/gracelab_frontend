import React, { useEffect, useState } from 'react';
import Pagetitle from '../patients/Pagetitle'
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Button, Collapse} from 'react-bootstrap'
import { FiPlus ,FiMinus} from "react-icons/fi";
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { Hospitalad,Hospitallable,Hospitalname } from '../hospital/Hospitallable';
import Hospitalsearch from '../hospital/Hospitalsearch';
import Hospitaldesc from '../hospital/Hospitaldesc';
import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';

function Laboratorypage() {
  const [loc, setloc] = useState(null)
  const [lab, setlab] = useState(null)
  const [labtest, setlabtest] = useState(null)
  const [hospitalData, setHospitalData] = useState([]);
  const [lablistall, setLablistall] = useState([]);
  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const location = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/location/city`
        );
        const locationdata = location.data.filter(
(inactivelocation) =>inactivelocation.IsActive
        );
        setloc(locationdata);
        // console.log("all", location.data);
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    fetchAllLocations();

    const fetchAllLaboratory = async () => {
      try {
        const laboratory = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listLaborateries`
        );
        
        const laboratoryname = laboratory.data.filter(
          (laboratorylistfetch)=> laboratorylistfetch.isActive
        );
        
        setlab(laboratoryname);
        // console.log("laboratory", laboratory.data);
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    fetchAllLaboratory();

    const fetchLaboratorytest = async  () => {

      try{
        const test = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getAllLabTests`
        );
        const laboratorytest = test.data.filter(

          (laboratorytestactive) => laboratorytestactive.IsActive
        );
        setlabtest(laboratorytest)
        // console.log("labtest",test.data)
      }catch (error)
      {
        console.log("errors: ",error)
      }
    }
    fetchLaboratorytest();


    const lablist = async  () => {

      try{
        const labt = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listLaborateries`
        )
        setLablistall(labt.data)
        console.log("lablistactivelab",labt.data)
      }catch (error)
      {
        console.log("errors: ",error)
      }
    }
    lablist();
  
  }, []);
  
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [laboratoryshowMore, laboratorysetShowMore] = useState(false); 
    const [populartestshowMore, populartestsetShowMore] = useState(false); 


    const toggleShowMore = (event) => {
      event.preventDefault();
      setShowMore(!showMore);
    };
    const laboratorytoggleShowMore = (event) => {
      event.preventDefault();
      laboratorysetShowMore(!laboratoryshowMore);
    };
    const populartesttoggleShowMore = (event) => {
      event.preventDefault();
      populartestsetShowMore(!populartestshowMore);
    };





    const toggleAccordion1 = (event) => {
      event.preventDefault();
        setOpen1(!open1);
      };
    const toggleAccordion2 = (event) => {
      event.preventDefault();
        setOpen2(!open2);
      };
    const toggleAccordion3 = (event) => {
      event.preventDefault();
        setOpen3(!open3);
      };
  return (
    <>

<Modalnavigationbar 
navigatelink="/laboratory-login"

/>
    <div className="page-title-area">
    <Pagetitle  
    heading="LABORATORY"
    pagetitlelink="/"
    title1="Home"
    title2="Laboratory"
    IconComponent={MdArrowForwardIos}
    />
</div>

{/* section start */}

<section className="services-details-area ptb-50 main-laboratory-section">
<Container>
      <Row>
      <Col lg={12} md={12} xs={12} className="mb-20">
          <div className="ad-image position-relative">
            <Image src={hospitalad} fluid />
            <div className="span-title">
              <span>Ad</span>
            </div>
          </div>
        </Col>
   

        {/* left side section start */}

        <div className="col-lg-4 col-md-12">
  <div className="services-sidebar laboratory-detail">
    <div className="services-list">
      <div className="services-details-faq">
        <ul className="accordion">


          <li className="accordion-item">
          <Link className="accordion-title active" onClick={toggleAccordion1}> Location{open1 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
             <Collapse in={open1}>
            <div className="widget-area">

             <div className="widget widget_search">
                <form className="search-form">
                  <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {loc?.map((city) => (
                <Hospitallable label={city.Name} size="6" />
              ))}
                    
          {showMore && loc?.map((city) => (
            <Hospitallable label={city.Name} size="6" />
          ))}
                
                {showMore ? (
        <Link onClick={toggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={toggleShowMore} className='view-more'>View More</Link>
      )}
      </div>
              </div>

            </div>
             </Collapse>
          </li>
          <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion2}> Laboratory Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open2}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                 <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                {lab?.map((labo) => (
                <Hospitallable  label={labo.LabName} size="12" />
              ))}
                  
          {laboratoryshowMore && lab?.map((labo) => (
            <Hospitallable label={labo.LabName} size="12" />
          ))}
                
                {laboratoryshowMore ? (
        <Link onClick={laboratorytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={laboratorytoggleShowMore} className='view-more'>View More</Link>
      )}
                 </div>
              </div>
            </div>
            </Collapse>
          </li>
          <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion3}>Popular Test {open3 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open3}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {labtest?.map((laboratorytest) => (
                <Hospitallable label={laboratorytest.TestName} size="12" />
              ))}
                  
          {populartestshowMore && labtest?.map((laboratorytest) => (
            <Hospitallable label={laboratorytest.TestName} size="12" />
          ))}
                
                {populartestshowMore ? (
        <Link onClick={populartesttoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={populartesttoggleShowMore} className='view-more'>View More</Link>
      )}
                </div>
              </div>
            </div>
            </Collapse>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  </div>

  <div className="col-lg-8 col-md-12">
  <div className="row mt-3">
  {lablistall.map((lab, index) => (
  <div key={index} className="col-lg-6 col-md-6 col-12">
    <Hospitaldesc
      hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${lab.Labphoto}`}
      mainheading={lab.LabName}
      headings={lab.address}
      starttime={lab.LabStartTime1}
      endtime={lab.LabEndTime1}
    />
  </div>
))}


  </div>
</div>

      </Row>
    </Container>
    
    </section>
    
    </>
  )
}

export default Laboratorypage