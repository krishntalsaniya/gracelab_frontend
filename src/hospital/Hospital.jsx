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
import { IoSearch } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import Doctorsec from '../doctor/Doctorsec';
import Hospitaldesc from './Hospitaldesc';

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
   const [selectedSpecialties, setSelectedSpecialties] = useState([]);
   const [selectedCities, setSelectedCities] = useState([]);
   const [hospitalName, sethospitalName] = useState([])
   const [adsData, setAdsData] = useState([]);
  const [hospitalad, setHospitalad] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [specilitysearchQuery, specilitysetSearchQuery] = useState('');
   const [hospitalsearchQuery, hospitalsetSearchQuery] = useState('');
   const [hospitalimage, sethospitalimage] = useState(null)

   const [visibleHospitals, setVisibleHospitals] = useState(2);

   const showMoreHospitals = () => {
  setVisibleHospitals(prevVisibleHospitals => prevVisibleHospitals + 2);
};
 
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

        const Hospitalspecilist = async() =>
          {
            try {
              const SpecilityHoapital = await axios.get
              (
                `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/HospitalSpeciality`
              );
  
              const specilityisactive = SpecilityHoapital.data.filter(
                (specialityisactive) => specialityisactive.IsActive
              );          
              setdoctorspecialist(specilityisactive)
              console.log("hospital speciality list",specilityisactive);
             } catch (error) {
              console.log("Hospital Speciality error  :", error)
             }
            
          }
          Hospitalspecilist();
          
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
                // Define parameters for pagination, sorting, and filtering
                const pageNo = 1; // Example page number
                const perPage = 10; // Example number of items per page
                const column = 'LabName'; // Example column to sort on
                const sortDirection = 'asc'; // Example sort direction
               
                const filter = true; // Example filter for active laboratories
        
                const skip = (pageNo - 1) * perPage;
        
                const response = await axios.post(
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listHospitalSpecialityBySpeciality`,
                  {
                    skip: skip,
                    per_page: perPage,
                    sorton: column,
                    sortdir: sortDirection,
                    match: {
                      Speciality: selectedSpecialties,
                      City: selectedCities,
                      HospitalName:hospitalName,
                      
                  },
                    isActive: filter,
                  }
                );
        
                // Assuming the response contains an array of laboratories
                const Hospitallist = response;
                console.log("labbbbbb",Hospitallist);
                const hospitaldata = Hospitallist.data
        
                console.log("hospital all data ",hospitaldata)
        
                // Filter active laboratories (if needed)
                const activeHospitals = hospitaldata.filter(hospital => hospital.isActive);
        
                sethospitalalllist(activeHospitals);
              } catch (error) {
                console.error('Error fetching laboratories:', error);
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
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listHospitalSpecialityBySpeciality`,
                  {
                    skip: skip,
                    per_page: perPage,
                    sorton: column,
                    sortdir: sortDirection,
                    match: {
                      Speciality: selectedSpecialties,
                      City: selectedCities,
                      HospitalName:hospitalName,
                      
                  },
                    isActive: filter,
                  }
                );
        
                // Assuming the response contains an array of laboratories
                const Hospitallist = response.data[0];
                console.log("labbbbbb",Hospitallist);
                const hospitaldata = Hospitallist.data
        
                console.log("hospital all data ",hospitaldata)
        
                // Filter active laboratories (if needed)
                const activeHospitals = hospitaldata.filter(hospital => hospital.isActive);
        
                sethospitalallparms(activeHospitals);
              } catch (error) {
                console.error('Error fetching laboratories:', error);
              }
            }
            Hospitalparms();

            const fetchAdsData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/customize-advertisement`);
        setAdsData(response.data);
        console.log("Imagessssssssssssssssssssssssssssssssssss",response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAdsData();

      const Hospitaladimage = async() =>
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
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCustomizeAdvertisementByHospitalSpeciality`,
                                      {
                      "skip": 0,
                      "per_page": 100,
                      "sorton": "createdAt",
                      "sortdir": "desc",
                        match: {
                      Speciality: selectedSpecialties,    
                  },
                      "IsActive": true
                    }

                );  
                console.log("customized advertizment: ",response);
        
                // Assuming the response contains an array of laboratories
                const Hospitallist = response;
                console.log("labbbbbb",Hospitallist);
               

              } catch (error) {
                console.error('Error fetching laboratories:', error);
              }
            }
            Hospitaladimage();

    
     
    }, [query,selectedSpecialties,selectedCities,hospitalName])
    
    useEffect(() => {
      const Hospitaladimage = async() =>
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
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCustomizeAdvertisementByHospitalSpeciality`,
                                      {
                      "skip": 0,
                      "per_page": 100,
                      "sorton": "createdAt",
                      "sortdir": "desc",
                        match: {
                      Speciality: selectedSpecialties,    
                  },
                      "IsActive": true
                    }

                );  
                console.log("customized advertizment: ",response);
        
                // Assuming the response contains an array of laboratories
                const hospitalimage = response.data[0].data[0].CustomAdsImage;
                console.log("hospitalimage",hospitalimage);
                sethospitalimage(`${process.env.REACT_APP_API_URL_GRACELAB}/${hospitalimage}`)
               

              } catch (error) {
                console.error('Error fetching laboratories:', error);
              }
            }
            Hospitaladimage();
    }, [])
    
const handleSpecialtyChange = (event) => {
  const { value, checked } = event.target;
  
  // Create a copy of selectedSpecialties
  let newSelectedSpecialties = [...selectedSpecialties];

  if (checked) {
    // Add value to newSelectedSpecialties if checked
    newSelectedSpecialties.push(value);
  } else {
    // Remove value from newSelectedSpecialties if unchecked
    newSelectedSpecialties = newSelectedSpecialties.filter(specialty => specialty !== value);
  }

  // Update the state with newSelectedSpecialties
  setSelectedSpecialties(newSelectedSpecialties);

  // Find the last checked specialty
  const lastCheckedSpecialty = newSelectedSpecialties[newSelectedSpecialties.length - 1];

  // Find an ad that matches the last checked specialty
  const matchedAd = adsData.find(ad => ad.HospitalSpeciality === lastCheckedSpecialty);

  if (matchedAd) {
    // Set the advertisement image path based on the matched ad
    const imagePath = matchedAd.CustomAdsImage;
    setHospitalad(imagePath);
    console.log("image path", imagePath);
  } else {
    // No matching ad found, clear the advertisement image
    setHospitalad(""); // Set to empty string or default image path
    console.log("No matching ad found for selected specialties");
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

     const filteredLocations = location?.filter(city => 
    city.Name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


     const filterespecility = doctorspecialist?.filter(city => 
    city.Speciality.toLowerCase().includes(specilitysearchQuery.toLowerCase())
  ) || [];

  const handlespeciality = (event) => {
    specilitysetSearchQuery(event.target.value);
  };

    const handleHospitalnameChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        sethospitalName([...hospitalName, value]);
      } else {
        sethospitalName(hospitalName.filter(HospitalName => HospitalName !== value));
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


     const filterespecilityhospitalname = hospitalalllist?.filter(city => 
    city.HospitalName.toLowerCase().includes(hospitalsearchQuery.toLowerCase())
  ) || [];

  const handlespecialityhospitalname = (event) => {
    hospitalsetSearchQuery(event.target.value);
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
              <Col lg={12} md={12} xs={12} className="mb-0">
  <div className="ad-image position-relative">
    <Image className='banner-image' 
      src={hospitalad ? `${process.env.REACT_APP_API_URL_GRACELAB}/${hospitalad}` : hospitalimage} 
      fluid 
    /> {/* Replace 'defaultAdImageURL' with your default ad image URL */}
    <div className="span-title">
      <span>Ad</span>
    </div>
  </div>
</Col>

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
              <label>
                <span className="screen-reader-text"></span>
                <input 
                  type="search" 
                  className="search-field" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </label>
              <button type="submit"><IoSearch /></button>
            </form>
   <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
   {filteredLocations?.map((city) => (
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
              <label>
                <span className="screen-reader-text"></span>
                <input 
                  type="search" 
                  className="search-field" 
                  placeholder="Search..." 
                  value={specilitysearchQuery}
                  onChange={handlespeciality}
                />
              </label>
              <button type="submit"><IoSearch /></button>
            </form>
            <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {filterespecility?.map((specialty) => (
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
      
      {selectedLabs?.map((hospital,index) => (
       <Hospitaldesc
       key={`${hospital._id}-${index}`}
       hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${hospital.Hospitalphoto}`}
       mainheading={hospital.HospitalName}
       headings={hospital.address} // Adjust this based on your API response structure
       starttime1={hospital.OPD1StartTime} // Adjust this based on your API response structure
       endtime1={hospital.OPD1EndTime} // Adjust this based on your API response structure
       starttime2={hospital.OPD2StartTime} // Adjust this based on your API response structure
       endtime2={hospital.OPD2EndTime} // Adjust this based on your API response structure
       starttime3={hospital.OPD3StartTime} // Adjust this based on your API response structure
       endtime3={hospital.OPD3EndTime} // Adjust this based on your API response structure
       dayslab1={hospital.DaysHospital1}
       dayslab2={hospital.DaysHospital2}
       dayslab3={hospital.DaysHospital3}
       locationmap={hospital.Location}
       imagelink={hospital.website}
           Labid={hospital._id}
           averageRating={hospital.averageRating}
     />
      ))}
    </div>
  ) : (
    <div className="all-labs">
      
       <div className="widget-area">
                            <div className="widget widget_search">
                              <form className="search-form">
                                <label>
                                  <span className="screen-reader-text"></span>
                                  <input
                                    type="search"
                                    className="search-field"
                                    placeholder="Search..."
                                   value={hospitalsearchQuery}
                  onChange={handlespecialityhospitalname}
                                  />
                                </label>
                                 <button type="submit"><IoSearch /></button>
                              </form>
                              
                            </div>
                          </div>
     
      {filterespecilityhospitalname.slice(0, visibleHospitals).map((hospital, index) => (
  <Hospitaldesc
    key={`${hospital._id}-${index}`}
    hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${hospital.Hospitalphoto}`}
    mainheading={hospital.HospitalName}
    headings={hospital.address} // Adjust this based on your API response structure
    starttime1={hospital.OPD1StartTime} // Adjust this based on your API response structure
    endtime1={hospital.OPD1EndTime} // Adjust this based on your API response structure
    starttime2={hospital.OPD2StartTime} // Adjust this based on your API response structure
    endtime2={hospital.OPD2EndTime} // Adjust this based on your API response structure
    starttime3={hospital.OPD3StartTime} // Adjust this based on your API response structure
    endtime3={hospital.OPD3EndTime} // Adjust this based on your API response structure
    dayslab1={hospital.DaysHospital1}
    dayslab2={hospital.DaysHospital2}
    dayslab3={hospital.DaysHospital3}
    locationmap={hospital.Location}
    imagelink={hospital.website}
    Labid={hospital._id}
    averageRating={hospital.averageRating}
  />
))}

{visibleHospitals < filterespecilityhospitalname.length && (
  <button className="show-more-button" onClick={showMoreHospitals}>Show More</button>
)}
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