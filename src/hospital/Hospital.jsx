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
   const [query, setQuery] = useState("");
   const [hospitalallparms, sethospitalallparms] = useState([])
 
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


          const Hospitalparms = async() =>
            {
              try {
                // Define parameters for pagination, sorting, and filtering
                const pageNo = 1; // Example page number
                const perPage = 10; // Example number of items per page
                const column = 'LabName'; // Example column to sort on
                const sortDirection = 'asc'; // Example sort direction
               
                const filter = true; // Example filter for active laboratories
        
                const skip = (pageNo - 1) * perPage;
        
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listHospitalByParams`,
                  {
                    skip: skip,
                    per_page: perPage,
                    sorton: column,
                    sortdir: sortDirection,
                    match: query,
                    isActive: filter,
                  }
                );
        
                // Assuming the response contains an array of laboratories
                const laboratories = response.data[0];
                console.log("labbbbbb",laboratories);
                const labdata = laboratories.data
        
                console.log("lab data ",labdata)
        
                // Filter active laboratories (if needed)
                const activeLaboratories = labdata.filter(lab => lab.isActive);
        
                sethospitalallparms(activeLaboratories);
              } catch (error) {
                console.error('Error fetching laboratories:', error);
              }
            }
            Hospitalparms();
    
     
    }, [query])
    



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
      const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue); // Update query state on every input change
      };

      const [selectedLabs, setSelectedLabs] = useState([]);
  
      const handleCheckboxChange = (e, labo) => {
        const isChecked = e.target.checked;
    
        if (isChecked) {
          // Add labo to selectedLabs if checked
          setSelectedLabs([...selectedLabs, labo]);
        } else {
          // Remove labo from selectedLabs if unchecked
          setSelectedLabs(selectedLabs.filter(lab => lab._id !== labo._id));
        }
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
                                  <label>
                    <span className="screen-reader-text"></span>
                    <input type="search"
                     className="search-field"
                      placeholder="Search..." 
                      onChange={handleInputChange} 
                      
                      />
                  </label>
                                  </form>
                                  <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                                    {hospitalallparms?.map((labo) => (
                                      <Col lg={12} md={12} xs={12} key={labo._id}>
                                      <div className="form-check">
                                        <input 
                                          type="checkbox" 
                                          className="form-check-input" 
                                          id={`lab-checkbox-${labo.id}`} 
                                          checked={selectedLabs.some(lab => lab._id === labo._id)} // Check if labo is in selectedLabs
                                          onChange={(e) => handleCheckboxChange(e, labo)} 
                                        />
                                        <label className="form-check-label" htmlFor={`lab-checkbox-${labo.id}`}>
                                          {labo.HospitalName}
                                        </label>
                                      </div>
                                    </Col>
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
  {selectedLabs.length > 0 ? (
    <div className="selected-labs">
      
      {selectedLabs?.map((hospital) => (
       <Doctorsec
       drimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${hospital.Hospitalphoto}`}
       drname={hospital.HospitalName}
       drlocation={hospital.area} // Adjust this based on your API response structure
       location={hospital.address} // Adjust this based on your API response structure
       starttime1={hospital.OPD1StartTime} // Adjust this based on your API response structure
       endtime1={hospital.OPD1EndTime} // Adjust this based on your API response structure
       starttime2={hospital.OPD2StartTime} // Adjust this based on your API response structure
       endtime2={hospital.OPD2EndTime} // Adjust this based on your API response structure
       starttime3={hospital.OPD3StartTime} // Adjust this based on your API response structure
       endtime3={hospital.OPD3EndTime} // Adjust this based on your API response structure
       dayslab1={hospital.DaysHospital1}
       dayslab2={hospital.DaysHospital2}
       dayslab3={hospital.DaysHospital3}
     />
      ))}
    </div>
  ) : (
    <div className="all-labs">
     
      {hospitalalllist?.map((hospital) => (
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
        dayslab1={hospital.DaysHospital1}
        dayslab2={hospital.DaysHospital2}
        dayslab3={hospital.DaysHospital3}
      />
      ))}
    </div>
  )}
</div>
    
              </Row>
            </Container>
          </section>
        </>
      )
    }
    
    export default Hospital;