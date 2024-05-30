import React, { useState } from 'react';
import Pagetitle from '../patients/Pagetitle'
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Button, Collapse} from 'react-bootstrap'
import { FiPlus ,FiMinus} from "react-icons/fi";
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import devinelab from '../img/devinelab.jpg'
import baordalab from '../img/barodalab.jpg'
import topranilab from '../img/topranilab.jpg'
import khushbulab from '../img/khushbulab.jpg'
import { Hospitalad,Hospitallable,Hospitalname } from '../hospital/Hospitallable';
import Hospitalsearch from '../hospital/Hospitalsearch';
import Hospitaldesc from '../hospital/Hospitaldesc';
import { MdArrowForwardIos } from "react-icons/md";

function Laboratorypage() {

    const hospitals = [
        { id: 1, name: 'Divine Lab' },
        { id: 2, name: 'Baroda Laboratory' },
        { id: 3, name: 'Desai Urological & Maternity Hospital' },
        { id: 4, name: 'Gayatri Pathological Laboratory' },
        { id: 5, name: 'Khushbu Pathology Laboratory' },
        { id: 6, name: 'Dr. Soni Laboratory' },
        
        // Other hospital objects
      ];
      const Speciality = [
        { id: 1, name: 'Genetic tests' },
        { id: 2, name: 'Hematology tests' },
        { id: 3, name: 'Hormone tests' },
        { id: 4, name: 'Immunological tests' },
        { id: 5, name: 'Infectious serology tests' },
        { id: 6, name: 'Microbiological tests' },
      
        
        // Other hospital objects
      ];

  
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [laboratoryshowMore, laboratorysetShowMore] = useState(false); 
    const [populartestshowMore, populartestsetShowMore] = useState(false); 

    const location = [
      "Alkapuri",
      "Bhayli",
      "Harni",
      "Vasna",
      "Karelibaug",
      "Alkapuri",
    ];
    const laboratoryname = [
      "Dr. Soni Laboratory",
      "Khushbu Pathology Laboratory",
      "Gayatri Pathological Laboratory",
      "Desai Urological & Maternity Hospital",
      "Divine Lab",
    ];
    const populartest = [
      "Microbiological tests",
      "Infectious serology tests",
      "Immunological tests",
      "Hormone tests",
      "Hematology tests",
      "Genetic tests",
    ];

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





    const toggleAccordion1 = () => {
        setOpen1(!open1);
      };
    const toggleAccordion2 = () => {
        setOpen2(!open2);
      };
    const toggleAccordion3 = () => {
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
          <Link className="accordion-title" onClick={toggleAccordion2}> Laboratory Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open2}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                 <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                {laboratoryname.map((label, index) => (
                <Hospitallable key={index} label={label} size="12" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {laboratoryshowMore && laboratoryname.map((label, index) => (
            <Hospitallable key={index} label={label} size="12" />
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
                {populartest.map((label, index) => (
                <Hospitallable key={index} label={label} size="12" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {populartestshowMore && populartest.map((label, index) => (
            <Hospitallable key={index} label={label} size="12" />
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

  {/* secound section start */}

  <div className="col-lg-8 col-md-12">
  <div className="row mt-3">
    <div className="col-lg-6 col-md-6 col-12">
      <Hospitaldesc
      hospitalimage={devinelab}
      mainheading="Devine Lab"
      headings={['Alkapuri', 'Gotri']} 
      />
    </div>
    <div className="col-lg-6 col-md-6 col-12">
<Hospitaldesc

  hospitalimage={baordalab}
        mainheading="Baroda Laboratory"
        headings={['Alkapuri', 'Karelibaug']} 
/>
    </div>
    <div className="col-lg-6 col-md-6 col-12">
      <Hospitaldesc
      hospitalimage={topranilab}
      mainheading="Toprani Advanced Lab Systems"
      headings={['Chakli circle', 'Karelibaug','Nizampura']}
      />
    </div>
    <div className="col-lg-6 col-md-6 col-12">
    <Hospitaldesc
      hospitalimage={khushbulab}
      mainheading="Gayatri Pathological Laboratory"
      headings={['Alkapuri', 'Karelibaug']} 
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

export default Laboratorypage