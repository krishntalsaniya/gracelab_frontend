import React, { useState,useEffect } from 'react';
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




function Pharmacy() {
  const [pharmacylist, setpharmacylist] = useState(null)
  const [pharmacylocation, setpharmacylocation] = useState(null)
  const [pharmacylaballlist, setpharmacylaballlist] = useState([]);

  useEffect(() => {
    
  const Pharmacylist = async () =>{
    try {
      const pharmactl = await axios.get(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listPharmacies`
      )
      const isactivepharmacylist = pharmactl.data.filter(
        (pharmacylistac) => pharmacylistac.isActive
      );

      setpharmacylist(isactivepharmacylist)
      console.log("Pharmacy list : ",pharmactl.data)

    } catch (error) {
      console.log('Error Show : ',error)
    }
  };
  Pharmacylist();

  const Pharmacylocation = async () =>{

    try {
      const locationp = await axios.get(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/location/city`
      );
      const pharmacylocation = locationp.data.filter(
        (pharmacylocationfetch) => pharmacylocationfetch.IsActive
      );
      setpharmacylocation(pharmacylocation)
      console.log('Pharmacy Location: ',locationp.data)

      
    } catch (error) {
      console.log('Error :', error)
    }
  };
  Pharmacylocation();

  const Pharmacylistall = async () =>{

    try {
      const pharmacylist = await axios.get(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listPharmacies`
      );
      // console.log("pha",pharmacylist)
      const Allisactivepharmacy = pharmacylist.data.filter(
        (post) =>post.isActive
      );
      
      setpharmacylaballlist(Allisactivepharmacy)
      console.log('Pharmacy Location: ',pharmacylist.data)

      
    } catch (error) {
      console.log('Error :', error)
    }
  };
  Pharmacylistall();
   
  }, [])
  
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


    const toggleAccordion1 = (event) => {
      event.preventDefault();
        setOpen1(!open1);
      };
    const toggleAccordion2 = (event) => {
       event.preventDefault();
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
                {pharmacylocation?.map((locationpha) => (
                <Hospitallable label={locationpha.Name} size="6" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {/* {showMore && location.map((label, index) => (
            <Hospitallable key={index} label={label} size="6" />
          ))}
                
                {showMore ? (
        <Link onClick={toggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={toggleShowMore} className='view-more'>View More</Link>
      )} */}
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
                {pharmacylist?.map((listshow) => (
                <Hospitallable label={listshow.PharmacyName} size="12" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {/* {pharmacyshowMore && pharmacyname.map((label, index) => (
            <Hospitallable key={index} label={label} size="12" />
          ))}
                
                {pharmacyshowMore ? (
        <Link onClick={pharmacytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={pharmacytoggleShowMore} className='view-more'>View More</Link>
      )} */}
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
  {pharmacylaballlist.map((lab, index) => (
  <div key={index} className="col-lg-12 col-md-6 col-12">
    <Hospitaldesc
      hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${lab.Pharmacyphoto}`}
      mainheading={lab.PharmacyName}
      headings={lab.address}
      starttime1={lab.PharmacyStartTime1}
      endtime1={lab.PharmacyEndTime1}
      starttime2={lab.PharmacyStartTime2}
      endtime2={lab.PharmacyEndTime2}
      starttime3={lab.PharmacyStartTime3}
      endtime3={lab.PharmacyEndTime3}
    />
  </div>
))}
    {/* <div className="col-lg-6 col-md-6 col-12">
<Hospitaldesc

  hospitalimage={patelpharmacy}
        mainheading="Patel Pharmacy"
        headings={['Alkapuri', 'Karelibaug']} 
/>
    </div> */}
    {/* <div className="col-lg-6 col-md-6 col-12">
      <Hospitaldesc
      hospitalimage={adhyamaheshwar}
      mainheading="Adhyamaheshawar Medical"
      headings={['Alkapuri', 'Karelibaug']}
     
      />
    </div> */}
    {/* <div className="col-lg-6 col-md-6 col-12">
    <Hospitaldesc
      hospitalimage={apollo}
      mainheading="Apollo Pharmacy"
      headings={['Alkapuri', 'Karelibaug']} 
      />
    </div> */}
  </div>
</div>

      </Row>
    </Container>
    
    </section>
    
    </>
  )
}

export default Pharmacy