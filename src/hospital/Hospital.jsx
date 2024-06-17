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

import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import Doctorsec from '../doctor/Doctorsec';

function Hospital() {

    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [hospitalshowMore, hospitalsetShowMore] = useState(false); 
    const [specialityshowMore, specialitysetShowMore] = useState(false); 
    const [location, setlocation] = useState(null)
    const [doctorspecialist, setdoctorspecialist] = useState(null)
    const [symptomwise, setsymptomwise] = useState(null)
   const [hospitalalllist, sethospitalalllist] = useState(null)
 
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
            // console.log("Doctor Speciality error  :", error)
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
                
              } catch (error) {
                
              }
            }
            Doctorsymptom();


          const Hospitalname = async() =>
            {
              try {
                
                const hospitalnamelist = await axios.get
                (
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listHospital`
                );
                sethospitalalllist(hospitalnamelist.data)
                console.log("Hospital all list active : ",hospitalnamelist)
              } catch (error) {
                console.log("Hospital all list active : ", error)
              }
            }
            Hospitalname();
    
     
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
          <Modalnavigationbar navigatelink="/hospital-login" />
          <div className="page-title-area">
            <Pagetitle
              heading="HOSPITAL"
              pagetitlelink="/"
              title1="Home"
              title2="Hospital"
              IconComponent={MdArrowForwardIos}
            />
          </div>
    
          <section className="services-details-area ptb-50 main-laboratory-section">
            <Container>
              <Row>
                {/* Your Hospital Ad Section */}
              </Row>
            </Container>
          </section>
    
          <section className="services-details-area ptb-50 main-laboratory-section">
            <Container>
              <Row>
                <div className="col-lg-4 col-md-12">
                  <div className="services-sidebar laboratory-detail">
                    <div className="services-list">
                      <div className="services-details-faq">
                        <ul className="accordion">
                          <li className="accordion-item">
                            <Link className="accordion-title active" onClick={toggleAccordion1}>
                              Location{open1 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}
                            </Link>
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
                            <Link className="accordion-title" onClick={toggleAccordion2}>
                              Hospital Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}
                            </Link>
                            <Collapse in={open2}>
                              <div className="widget-area">
                                <div className="widget widget_search">
                                  <form className="search-form">
                                    <Hospitalsearch />
                                  </form>
                                  <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                                    {hospitalalllist?.map((hospital) => (
                                      <Hospitallable key={hospital._id} label={hospital.HospitalName} size="12" />
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
                            <Link className="accordion-title" onClick={toggleAccordion3}>
                              Speciality {open3 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}
                            </Link>
                            <Collapse in={open3}>
                             
                              <div className="widget-area">

<div className="widget widget_search">
   <form className="search-form">
     <Hospitalsearch />
   </form>
   <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
   {doctorspecialist?.map((city) => (
   <Hospitallable label={city.Speciality} size="6" />
 ))}
       
{showMore && doctorspecialist?.map((city) => (
<Hospitallable label={city.Speciality} size="6" />
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
    
                <div className="col-lg-8 col-md-12">
                  <div className="row">
                    {hospitalalllist?.map((hospital, index) => (
                      <div key={index} className="col-lg-12 col-md-6 col-12">
                        <Doctorsec
                          drimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${hospital.Hospitalphoto}`}
                          drname={hospital?.HospitalName}
                          drlocation={hospital?.area} // Adjust this based on your API response structure
                          location={hospital?.address} // Adjust this based on your API response structure
                          starttime1={hospital?.OPD1StartTime} // Adjust this based on your API response structure
                          endtime1={hospital?.OPD1EndTime} // Adjust this based on your API response structure
                          starttime2={hospital?.OPD2StartTime} // Adjust this based on your API response structure
                          endtime2={hospital?.OPD2EndTime} // Adjust this based on your API response structure
                          starttime3={hospital?.OPD3StartTime} // Adjust this based on your API response structure
                          endtime3={hospital?.OPD3EndTime} // Adjust this based on your API response structure
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
    
    export default Hospital;