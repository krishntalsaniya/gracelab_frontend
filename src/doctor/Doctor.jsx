import React, { useState } from 'react';
import Pagetitle from '../patients/Pagetitle'
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Button, Collapse} from 'react-bootstrap'
import { FiPlus ,FiMinus} from "react-icons/fi";
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { Hospitalad, Hospitallable, Hospitalname } from '../hospital/Hospitallable';
import Hospitalsearch from '../hospital/Hospitalsearch';
import drimage from '../img/drimage.jpg';
import Doctorsec from './Doctorsec';
import { MdArrowForwardIos } from "react-icons/md";

function Doctor() {
  const Speciality = [
    'Viral Infections' ,
    'Skin infection' ,
    'ENT' ,
    'Gynaecologist' ,
  
    
    // Other hospital objects
  ];
  const Symptom = [
    'Fever' ,
    'Paresthesia' ,
    'Chills' ,
    'Coughing' ,
  
    
    // Other hospital objects
  ];

  
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [hospitalshowMore, hospitalsetShowMore] = useState(false); 
    const [specialityshowMore, specialitysetShowMore] = useState(false); 
    const [symptomshowMore, symptomsetShowMore] = useState(false); 

    const location = [
      "Alkapuri",
      "Bhayli",
      "Harni",
      "Vasna",
      "Karelibaug",
      "Alkapuri",
    ];
    const hospitalname = [
      "Sterling Multispeciality Hospital",
      "Zydus Hospital",
      "Tricolour Hospital",
      "Aadicura Superspeciality Hospital",
      "Sterling Hospital",
    ];




    const toggleShowMore = (event) => {
      event.preventDefault();
      setShowMore(!showMore);
    };
    const hospitaltoggleShowMore = (event) => {
      event.preventDefault();
      hospitalsetShowMore(!hospitalshowMore);
    };
    const specialitytoggleShowMore = (event) => {
      event.preventDefault();
      specialitysetShowMore(!specialityshowMore);
    };
    const symptomtoggleShowMore = (event) => {
      event.preventDefault();
      symptomsetShowMore(!symptomshowMore);
    };


    const toggleAccordion1 = () => {
        setOpen1(!open1);
      };
    const toggleAccordion2 = () => {
        setOpen2(!open2);
      };
    const toggleAccordion3 = () => {
        setOpen3(!open3);
      };
    const toggleAccordion4 = () => {
        setOpen4(!open4);
      };
  return (
    <>

<Modalnavigationbar 
navigatelink="/doctor-login"

/>
    <div className="page-title-area">
    <Pagetitle  
    heading="Doctor"
    pagetitlelink="/"
    title1="Home"
    title2="Doctor"
    IconComponent={MdArrowForwardIos}
    />
</div>

{/* section start */}

<section className="services-details-area ptb-50 main-laboratory-section">
<Container>
      <Row>
        <Hospitalad
        hospitaladimage={hospitalad}
        />

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
                            {location.map((label, index) => (
                <Hospitallable key={index} label={label} size="6" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {showMore && location.map((label, index) => (
            <Hospitallable key={index} label={label} size="6" />
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
          <Link className="accordion-title" onClick={toggleAccordion2}> Hospital Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open2}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                 <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                          {hospitalname.map((label, index) => (
              <Hospitallable key={index} label={label} size="12" />
            ))}
              {hospitalshowMore && hospitalname.map((label, index) => (
                          <Hospitallable key={index} label={label} />
                        ))}
                
                {hospitalshowMore ? (
        <Link onClick={hospitaltoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={hospitaltoggleShowMore} className='view-more'>View More</Link>
      )}

                 </div>
              </div>
            </div>
            </Collapse>
          </li>
          <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion3}>Speciality {open3 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open3}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {Speciality.map((label, index) => (
              <Hospitallable key={index} label={label} size="12" />
            ))}
                  
                  {specialityshowMore && Speciality.map((label, index) => (
                          <Hospitallable key={index} label={label} />
                        ))}
                
                {specialityshowMore ? (
        <Link onClick={specialitytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={specialitytoggleShowMore} className='view-more'>View More</Link>
      )}
                </div>
              </div>
            </div>
            </Collapse>
          </li>

          <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion4}>Symptom Wise {open4 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open4}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {Symptom.map((label, index) => (
              <Hospitallable key={index} label={label} size="12" />
            ))}
                  
                  {symptomshowMore && Symptom.map((label, index) => (
                          <Hospitallable key={index} label={label} />
                        ))}
                
                {symptomshowMore ? (
        <Link onClick={symptomtoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={symptomtoggleShowMore} className='view-more'>View More</Link>
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

  {/* secound section start */}

  {/* doctor section start */}

  <div className="col-lg-8 col-md-12">
  <div className="row">
    <div className="col-lg-4 col-md-6 col-12">
      <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation=" Zydus Hospital"
      location="Alkapuri"
      />
    </div>
    <div className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="ENT Speciality, Sterling Hospital"
      location="Alkapuri"
      />
    </div>
    <div className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="Gynaecologist, Zydus Hospital"
      location="Alkapuri"
      />
    </div>
    <div className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="ENT Speciality, Sterling Hospital"
      location="Alkapuri"
      />
    </div>
  </div>
</div>

      </Row>
    </Container>
    
    </section>
    
    </>
  )
}

export default Doctor