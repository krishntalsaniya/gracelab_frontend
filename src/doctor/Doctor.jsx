import React, { useState,useEffect } from 'react';
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
import axios from 'axios';

function Doctor() {

    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [hospitalshowMore, hospitalsetShowMore] = useState(false); 
    const [specialityshowMore, specialitysetShowMore] = useState(false); 
    const [symptomshowMore, symptomsetShowMore] = useState(false); 
    const [location, setlocation] = useState(null)
    const [doctorspecialist, setdoctorspecialist] = useState(null)
    const [symptomwise, setsymptomwise] = useState(null)
    const [doctorlist, setdoctorlist] = useState([])

    const hospitalname = [
      "Sterling Multispeciality Hospital",
      "Zydus Hospital",
      "Tricolour Hospital",
      "Aadicura Superspeciality Hospital",
      "Sterling Hospital",
    ];

    useEffect(() => {
    
      const Locationfetch = async() => 
        {
          try {
            const locationcity = await axios.get
            (
              `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/location/city`
            );
            const docotorlocation = locationcity.data.filter(
              (doctorisactive) => doctorisactive.IsActive
            );

            setlocation(docotorlocation);
            // console.log("doctor list : ",locationcity.data);
          } catch (error) {
            console.log("doctor error :", error)
          }
        }
        Locationfetch();

        const Doctorspecilist = async() =>
          {
           try {
            const Specilitydoctor = await axios.get
            (
              `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/DoctorSpeciality`
            );

            const specilityisactive = Specilitydoctor.data.filter(
              (specialityisactive) => specialityisactive.IsActive
            );          
            setdoctorspecialist(specilityisactive)
           } catch (error) {
            console.log("Doctor Speciality error  :", error)
           }
            
          }
          Doctorspecilist();
          
          const Doctorsymptom = async() =>
            {
              try {
                
                const Symptom = await axios.get
                (
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api//auth/list/DiseasesSymptoms`
                );
                const symptomisactive = Symptom.data.filter(
                  (symptomisactivefetch) => symptomisactivefetch.IsActive
                );  
                setsymptomwise(symptomisactive)
                // console.log("Symptom wise data : ",Symptom.data)
              } catch (error) {
                console.log("Symptom wise data error : ", error)
              }
            }
            Doctorsymptom();

    const Doctorlist = async() =>
      {
        try {
          const alldoctorlist =  await axios.get
        (
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctors`
        );
        const alldoctorlistisactive = alldoctorlist.data.filter(
          (alldoctorlistactive) => alldoctorlistactive.isActive
        );  
        setdoctorlist(alldoctorlistisactive);
        console.log("All doctor list :",alldoctorlist.data);
        } catch (error) {
          console.log("All doctor list error :",error)
        }

      }
      Doctorlist();


    
     
    }, [])
    



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
    const toggleAccordion4 = (event) => {
      event.preventDefault();
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
                            {location?.map((city) => (
                <Hospitallable label={city.Name} size="6" />
              ))}
                 {/* Render additional labels only if showMore is true */}
                 
          {showMore && location?.map((city) => (
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
                {doctorspecialist?.map((special) => (
              <Hospitallable label={special.Speciality} size="12" />
            ))}
                  
                  {specialityshowMore && doctorspecialist?.map((special) => (
                          <Hospitallable label={special.Speciality} />
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
                {symptomwise?.map((allsymptom) => (
              <Hospitallable label={allsymptom.Symptom} size="12" />
            ))}
                  
                  {symptomshowMore && symptomwise?.map((allsymptom) => (
                          <Hospitallable label={allsymptom.Symptom} />
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

  <div className="col-lg-8 col-md-12">
  <div className="row">
  {doctorlist.map((doc, index) => (
  <div key={index} className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${doc.Doctorphoto}`}
      drname={doc.DoctorName}
      drlocation={doc.area}
      location={doc.address}
     
    />
  </div>
))}
    {/* <div className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="ENT Speciality, Sterling Hospital"
      location="Alkapuri"
      />
    </div> */}
    {/* <div className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="Gynaecologist, Zydus Hospital"
      location="Alkapuri"
      />
    </div> */}
    {/* <div className="col-lg-4 col-md-6 col-12">
    <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="ENT Speciality, Sterling Hospital"
      location="Alkapuri"
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

export default Doctor