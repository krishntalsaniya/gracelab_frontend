import React, { useState } from 'react';
import Pagetitle from '../patients/Pagetitle'
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Button, Collapse} from 'react-bootstrap'
import { FiPlus ,FiMinus} from "react-icons/fi";
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import medkart from '../img/medkart.jpg'
import patelpharmacy from '../img/patel-pharmacy.jpg'
import adhyamaheshwar from '../img/adhyamaheshwar-medical.jpg'
import apollo from '../img/apollo-pharmacy.jpg'

import { Hospitalad,Hospitallable,Hospitalname } from '../hospital/Hospitallable';
import Hospitalsearch from '../hospital/Hospitalsearch';
import Hospitaldesc from '../hospital/Hospitaldesc';
import { MdArrowForwardIos } from "react-icons/md";

function Pharmacy() {
  const location = [
    "Alkapuri",
    "Bhayli",
    "Harni",
    "Vasna",
    "Karelibaug",
    "Alkapuri",
  ];

    const pharmacyname = [
        'Medkart Pharmacy' ,
        'Patel Pharmacy' ,
        'Adhyamaheshwar Medical' ,
        'Apollo Pharmacy' ,
      ];
   
      const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [pharmacyshowMore, pharmacysetShowMore] = useState(false); 




    const toggleShowMore = (event) => {
      event.preventDefault();
      setShowMore(!showMore);
    };
    const pharmacytoggleShowMore = (event) => {
      event.preventDefault();
      pharmacysetShowMore(!pharmacyshowMore);
    };


    const toggleAccordion1 = () => {
        setOpen1(!open1);
      };
    const toggleAccordion2 = () => {
        setOpen2(!open2);
      };
 
  return (
    <>

<Modalnavigationbar 
navigatelink="/pharmacy-login"

/>
    <div className="page-title-area">
    <Pagetitle  
    heading="PHARMACY"
    pagetitlelink="/"
    title1="Home"
    title2="Pharmacy"
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
          <Link className="accordion-title" onClick={toggleAccordion2}> Pharmacy Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open2}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                 <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {pharmacyname.map((label, index) => (
                <Hospitallable key={index} label={label} size="12" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {pharmacyshowMore && pharmacyname.map((label, index) => (
            <Hospitallable key={index} label={label} size="12" />
          ))}
                
                {pharmacyshowMore ? (
        <Link onClick={pharmacytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={pharmacytoggleShowMore} className='view-more'>View More</Link>
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
      hospitalimage={medkart}
      mainheading="Medkart Pharmacy"
      headings={['Alkapuri', 'Gotri']} 
      />
    </div>
    <div className="col-lg-6 col-md-6 col-12">
<Hospitaldesc

  hospitalimage={patelpharmacy}
        mainheading="Patel Pharmacy"
        headings={['Alkapuri', 'Karelibaug']} 
/>
    </div>
    <div className="col-lg-6 col-md-6 col-12">
      <Hospitaldesc
      hospitalimage={adhyamaheshwar}
      mainheading="Adhyamaheshawar Medical"
      headings={['Alkapuri', 'Karelibaug']}
      />
    </div>
    <div className="col-lg-6 col-md-6 col-12">
    <Hospitaldesc
      hospitalimage={apollo}
      mainheading="Apollo Pharmacy"
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

export default Pharmacy