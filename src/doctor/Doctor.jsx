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
import { IoSearch } from "react-icons/io5";

function Doctor() {

    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    
    const [searchQuery, setSearchQuery] = useState('');
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
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedsymtoms, setSelectedsymtoms] = useState([]);



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
            console.log("doctor list location : ",locationcity.data);
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
            console.log("specilityisactive",specilityisactive);
           } catch (error) {
            console.log("Doctor Speciality error  :", error)
           }
            
          }
          Doctorspecilist();
          
         

          const Doctorlistall = async() =>
            {
              try {
                
                const Symptom = await axios.post
                (
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctorsBySpeciality`,
                  {
                      skip: 0,
                      per_page: 1000,
                      sorton: "DoctorName",
                      sortdir: "asc",
                      match: {
                          Speciality: selectedSpecialties,
                          City: selectedCities,
                          DiseasesSymptoms:selectedsymtoms,
                      },
                      isActive: true,
                  }
              );
                
                setdoctorlist(Symptom.data)
                // console.log("Symptom wise data : ",Symptom.data)
              } catch (error) {
                console.log("Symptom wise data error : ", error)
              }
            }
            Doctorlistall();

            const Doctorlist = async () => {
              try {
                  const pageNo = 1;
                  const perPage = 10;
                  const column = 'DoctorName';
                  const sortDirection = 'asc';
                  const filter = true;
                  const skip = (pageNo - 1) * perPage;
    
                  const response = await axios.post(
                      `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctorsBySpeciality`,
                      {
                          skip: skip,
                          per_page: perPage,
                          sorton: column,
                          sortdir: sortDirection,
                          match: {
                              Speciality: selectedSpecialties,
                              City: selectedCities,
                              DiseasesSymptoms:selectedsymtoms,
                          },
                          isActive: filter,
                      }
                  );
    
                  console.log("data doctor: ",response.data[0]);
    
                  const laboratories = response.data[0];
                  const labdata = laboratories.data;
                  const activeLaboratories = labdata.filter(lab => lab.isActive);
                  setDoctorAllList(activeLaboratories);
                  console.log("doctor all list :",setDoctorAllList);
              } catch (error) {
                  console.error('Error fetching laboratories:', error);
              }
          };
          Doctorlist();

           const Doctorsymtoms = async() =>
          {
           try {
            const Doctorsymtoms = await axios.get
            (
              `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/DiseasesSymptoms`
            );

            const specilityisactive = Doctorsymtoms.data.filter(
              (specialityisactive) => specialityisactive.IsActive
            );          
            setsymptomwise(specilityisactive)
            console.log("doctor symtoms",specilityisactive);
           } catch (error) {
            console.log("doctor symtoms  :", error)
           }
            
          }
          Doctorsymtoms();
          
   
    }, [query,selectedSpecialties,selectedCities,selectedsymtoms])

  //   useEffect(() => {
    
  // }, []);
    
    const handleSpecialtyChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setSelectedSpecialties([...selectedSpecialties, value]);
        console.log("checked box selected :",setSelectedSpecialties);
      } else {
        setSelectedSpecialties(selectedSpecialties.filter(specialty => specialty !== value));
      }
    };

    const handleCityChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setSelectedCities([...selectedCities, value]);
      } else {
        setSelectedCities(selectedCities.filter(city => city !== value));
      }
    };


    const handlesymtomsChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setSelectedsymtoms([...selectedsymtoms, value]);
      } else {
        setSelectedsymtoms(selectedsymtoms.filter(symtoms => symtoms !== value));
      }
    };
    


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
                <label>
                    <span className="screen-reader-text"></span>
                    <input type="search" className="search-field" placeholder="Search..." />
                  </label>
                  <button type="submit"><IoSearch /></button>
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {location?.map((city) => (
      <Col lg={12} md={12} xs={12} key={city._id}>
        <div className="form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id={`city-${city._id}`} 
            value={city._id} 
            onChange={handleCityChange} 
          />
          <label className="form-check-label" htmlFor={`city-${city._id}`}>{city.Name}</label>
        </div>
      </Col>
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
                <label className="form-check-label">
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
                <label>
                    <span className="screen-reader-text"></span>
                    <input type="search" className="search-field" placeholder="Search..." />
                  </label>
                  <button type="submit"><IoSearch /></button>
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>


                {doctorspecialist?.map((specialty) => (
                                                                    <Col xs={6} key={specialty._id}>
                                                                        <div className="form-check">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-check-input"
                                                                                id={specialty._id}
                                                                                value={specialty._id}
                                                                                checked={selectedSpecialties.includes(specialty._id)}
                                                                                onChange={handleSpecialtyChange}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={specialty._id}>
                                                                                {specialty.Speciality}
                                                                            </label>
                                                                        </div>
                                                                    </Col>
                                                                ))}

                  {/* {specialityshowMore && doctorspecialist?.map((special) => (
                          <Hospitallable label={special.Speciality} />
                        ))}
                
                {specialityshowMore ? (
        <Link onClick={specialitytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={specialitytoggleShowMore} className='view-more'>View More</Link>
      )} */}
                </div>
              </div>
            </div>
            </Collapse>
          </li>

           <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion4}>Symtoms {open4 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open4}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                <label>
                    <span className="screen-reader-text"></span>
                    <input type="search" className="search-field" placeholder="Search..." />
                  </label>
                  <button type="submit"><IoSearch /></button>
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>


                {symptomwise?.map((specialty) => (
                                                                    <Col xs={6} key={specialty._id}>
                                                                        <div className="form-check">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-check-input"
                                                                                id={specialty._id}
                                                                                value={specialty._id}
                                                                                checked={selectedsymtoms.includes(specialty._id)}
                                                                                onChange={handlesymtomsChange}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={specialty._id}>
                                                                                {specialty.Symptom}
                                                                            </label>
                                                                        </div>
                                                                    </Col>
                                                                ))}

                  {/* {specialityshowMore && doctorspecialist?.map((special) => (
                          <Hospitallable label={special.Speciality} />
                        ))}
                
                {specialityshowMore ? (
        <Link onClick={specialitytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={specialitytoggleShowMore} className='view-more'>View More</Link>
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
  {selectedLabs.length > 0 ? (
    <div className="selected-labs">
      
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
       dayslab1={doc.DaysDoctor1}
       dayslab2={doc.DaysDoctor2}
       dayslab3={doc.DaysDoctor3}
      
     />
      ))}
    </div>
  ) : (
    <div className="all-labs">
      
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
        dayslab1={doc.DaysDoctor1}
       dayslab2={doc.DaysDoctor2}
       dayslab3={doc.DaysDoctor3}
       
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