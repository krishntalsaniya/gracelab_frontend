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
    const [DoctorAllList, setDoctorAllList] = useState([])
    const [query, setQuery] = useState("");


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

          const Doctorlistall = async() =>
            {
              try {
                
                const Symptom = await axios.get
                (
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctors`
                );
                
                setdoctorlist(Symptom.data)
                // console.log("Symptom wise data : ",Symptom.data)
              } catch (error) {
                console.log("Symptom wise data error : ", error)
              }
            }
            Doctorlistall();

    const Doctorlist = async() =>
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
            `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctorsByParams`,
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
          console.log("pharmacy_data : ",laboratories);
          const labdata = laboratories.data
    
          console.log("lab data ",labdata)
    
          // Filter active laboratories (if needed)
          const activeLaboratories = labdata.filter(lab => lab.isActive);
    
          setDoctorAllList(activeLaboratories);
        } catch (error) {
          console.error('Error fetching laboratories:', error);
        }

      }
      Doctorlist(); 

 
      
      
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
          <Link className="accordion-title" onClick={toggleAccordion2}> Doctor Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
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
                          {DoctorAllList?.map((labo) => (
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
                  {labo.DoctorName}
                </label>
              </div>
            </Col>
            ))}
              {/* {hospitalshowMore && DoctorAllList.map((label, index) => (
                          <Hospitallable key={index} label={label} />
                        ))}
                
                {hospitalshowMore ? (
        <Link onClick={hospitaltoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={hospitaltoggleShowMore} className='view-more'>View More</Link>
      )} */}

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
  {selectedLabs.length > 0 ? (
    <div className="selected-labs">
      <h4>Selected Laboratories</h4>
      {selectedLabs.map((doc) => (
       <Doctorsec
       key={doc.id}
       drimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${doc.Doctorphoto}`}
       drname={doc.DoctorName}
       drlocation={doc.area}
       location={doc.address}
       starttime1={doc.OPD1StartTime}
       endtime1={doc.OPD1EndTime}
       starttime2={doc.OPD2StartTime}
       endtime2={doc.OPD2EndTime}
       starttime3={doc.OPD3StartTime}
       endtime3={doc.OPD3EndTime}
      
     />
      ))}
    </div>
  ) : (
    <div className="all-labs">
      <h4>All Laboratories</h4>
      {doctorlist.map((doc) => (
        <Doctorsec
        key={doc.id}
        drimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${doc.Doctorphoto}`}
        drname={doc.DoctorName}
        drlocation={doc.area}
        location={doc.address}
        starttime1={doc.OPD1StartTime}
        endtime1={doc.OPD1EndTime}
        starttime2={doc.OPD2StartTime}
        endtime2={doc.OPD2EndTime}
        starttime3={doc.OPD3StartTime}
        endtime3={doc.OPD3EndTime}
       
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

export default Doctor