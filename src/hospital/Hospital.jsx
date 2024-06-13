import React, { useState ,useEffect} from 'react';
import Pagetitle from '../patients/Pagetitle'
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Button, Collapse} from 'react-bootstrap'
import { FiPlus ,FiMinus} from "react-icons/fi";
import Hospitalsearch from './Hospitalsearch';
import {Hospitalad, Hospitallable, Hospitalname} from './Hospitallable';
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import sterling from '../img/sterling.jpg'
import tricolor from '../img/tricolor.jpg'
import zydus from '../img/zydus.jpg'
import gujrat from '../img/gujara-hospital.jpg'
import Hospitaldesc from './Hospitaldesc';
import { MdArrowForwardIos } from "react-icons/md";

function Hospital() {

  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    // Dummy data
    const dummyData = [
      {
        mainheading: 'Sterling Hospital',
        headings: ['Alkapuri', 'Gotri']
      },
      {
        mainheading: 'Medkart Pharmacy',
        headings: ['Alkapuri', 'Gotri', 'Manjalpur']
      },
      {
        mainheading: 'Another Hospital',
        headings: ['Location1', 'Location2']
      },
      {
        mainheading: 'Another Hospital',
        headings: ['Location1', 'Location2']
      }
    ];

    // Set the dummy data to state
    setHospitalData(dummyData);
  }, []);
  const location = [
    "Alkapuri",
    "Bhayli",
    "Harni",
    "Vasna",
    "Karelibaug",
    "Alkapuri",
  ];


  const hospitalname = [
   'Sterling Hospital' ,
   'Aadicura Superspeciality Hospital' ,
   'Tricolour Hospital' ,
   'Zydus Hospital' ,
   'Sterling Multispeciality Hospital' ,
    
    // Other hospital objects
  ];
  const Speciality = [
    'Viral Infections' ,
    'Skin infection' ,
    'ENT' ,
    'Gynaecologist' ,
  
    
    // Other hospital objects
  ];

  
  
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [hospitalnameshowMore, hospitalnamesetShowMore] = useState(false); 
    const [specialityshowMore, specialitysetShowMore] = useState(false); 



    const toggleShowMore = (event) => {
      event.preventDefault();
      setShowMore(!showMore);
    };
    const hospitalnametoggleShowMore = (event) => {
      event.preventDefault();
      hospitalnamesetShowMore(!hospitalnameshowMore);
    };
    const specialitytoggleShowMore = (event) => {
      event.preventDefault();
      specialitysetShowMore(!specialityshowMore);
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
navigatelink="/hospital-login"

/>
    <div className="page-title-area">
    <Pagetitle  
    heading="HOSPITAL"
    pagetitlelink="/"
    title1="Home"
    title2="Hopital"
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
                 {/* Render additional labels only if showMore is true */}
                 
          {hospitalnameshowMore && hospitalname.map((label, index) => (
            <Hospitallable key={index} label={label} size="12" />
          ))}
                
                {hospitalnameshowMore ? (
        <Link onClick={hospitalnametoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={hospitalnametoggleShowMore} className='view-more'>View More</Link>
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
                <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                {Speciality.map((label, index) => (
                <Hospitallable key={index} label={label} size="12" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {specialityshowMore && Speciality.map((label, index) => (
            <Hospitallable key={index} label={label} size="12" />
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
        </ul>
      </div>
    </div>
  </div>
  
  </div>

  {/* secound section start */}

  <div className="col-lg-8 col-md-12">
  <div className="row mt-3">
 
      {hospitalData.map((hospital, index) => (
        <div className="col-lg-12 col-md-6 col-12" key={index}>
          <Hospitaldesc
            hospitalimage={hospital.mainheading === 'Sterling Hospital' ? sterling : sterling} // Example logic for assigning images
            mainheading={hospital.mainheading}
            headings={hospital.headings.map((heading, idx) => <span className='headingspan' key={idx}>{heading}</span>)}
          />
        </div>
      ))}
  
    {/* <div className="col-lg-6 col-md-6 col-12">
<Hospitaldesc

  hospitalimage={zydus}
        mainheading="Zydus Hospital"
        headings={['Alkapuri', 'Karelibaug']} 
/>
    </div>
    <div className="col-lg-6 col-md-6 col-12">
      <Hospitaldesc
      hospitalimage={tricolor}
      mainheading="Tricolour Hospital"
      headings={['Alkapuri', 'Karelibaug']}
      />
    </div>
    <div className="col-lg-6 col-md-6 col-12">
    <Hospitaldesc
      hospitalimage={gujrat}
      mainheading="Gujrat Hospital"
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

export default Hospital