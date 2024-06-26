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
import Pharmacysec from './Pharmacysec';




function Pharmacy() {
  const [pharmacylist, setpharmacylist] = useState([])
  const [pharmacylocation, setpharmacylocation] = useState(null)
  const [pharmacylaballlist, setpharmacylaballlist] = useState([]);
  const [PharmacyList, setPharmacyList] = useState([])
  const [selectedCities, setSelectedCities] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);


  useEffect(() => {
    
  const Pharmacylist = async () =>{
    try {
      // Define parameters for pagination, sorting, and filtering
      const pageNo = 1; // Example page number
      const perPage = 10; // Example number of items per page
      const column = 'LabName'; // Example column to sort on
      const sortDirection = 'asc'; // Example sort direction
     
      const filter = true; // Example filter for active laboratories

      const skip = (pageNo - 1) * perPage;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listPharmaciesByCity`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: {
           
            City: selectedCities.length > 0 ? selectedCities : undefined,
        },
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
      console.log("location:",activeLaboratories);
     

      setPharmacyList(activeLaboratories);
    } catch (error) {
      console.error('Error fetching laboratories:', error);
    }
  };
  Pharmacylist();

  
  const lablist = async  () => {

    try {
      // Define parameters for pagination, sorting, and filtering
      const pageNo = 1; // Example page number
      const perPage = 10; // Example number of items per page
      const column = 'LabName'; // Example column to sort on
      const sortDirection = 'asc'; // Example sort direction
     
      const filter = true; // Example filter for active laboratories

      const skip = (pageNo - 1) * perPage;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listPharmaciesByCity`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: {
           
            City: selectedCities,
        },
          isActive: filter,
        }
      );
      console.log("response locatio data",response);

      // Assuming the response contains an array of laboratories
      const laboratories = response.data[0];
      console.log("pharmacy_data : ",laboratories);
      const labdata = laboratories.data

      console.log("lab data ",labdata)

      // Filter active laboratories (if needed)
      const activeLaboratories = labdata.filter(lab => lab.isActive);

      setpharmacylist(activeLaboratories);
    } catch (error) {
      console.error('Error fetching laboratories:', error);
    }
  }
  lablist();

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


   
  }, [query,selectedCities])

  useEffect(() => {
    setFilteredPharmacies(pharmacylist); // Initialize filtered list with full list on component mount
  }, [pharmacylist]);



  const handleCityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCities([...selectedCities, value]);
      
    } else {
      setSelectedCities(selectedCities.filter(city => city !== value));
    }

     setPharmacyList([]);
    // setCurrentPage(1);

  };

    const filteredLabs = PharmacyList?.filter(
    (lab) => lab.PharmacyName.toLowerCase().includes(query.toLowerCase())
  );

   const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue); // Update query state on every input change
  };
  
      const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [pharmacyshowMore, pharmacysetShowMore] = useState(false); 
    const [selectedLocations, setSelectedLocations] = useState([]);
     const [locationSearchTerm, setLocationSearchTerm] = useState('');




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

     useEffect(() => {
    // Filter pharmacies whenever searchTerm changes
    const filtered = pharmacylist.filter(pharmacy =>
      pharmacy.PharmacyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPharmacies(filtered);
  }, [searchTerm, pharmacylist]);
 
  useEffect(() => {
  // Filter pharmacies whenever query changes
  const filtered = pharmacylist.filter(pharmacy =>
    pharmacy.PharmacyName.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredPharmacies(filtered);
}, [query, pharmacylist]); 
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
                                  <Col lg={12} md={12} xs={12} key={locationpha._id}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`city-${locationpha._id}`}
                                        value={locationpha._id}
                                        onChange={handleCityChange}
                                      />
                                      <label className="form-check-label" htmlFor={`city-${locationpha._id}`}>{locationpha.Name}</label>
                                    </div>
                                  </Col>
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
          {/* <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion2}> Pharmacy Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open2}>
             <div className="widget-area">
      <div className="widget widget_search">
        <form className="search-form">
          <label>
            <span className="screen-reader-text">Search Pharmacies</span>
            <input
              type="search"
              className="search-field"
              placeholder="Search..."
              
              onChange={handleInputChange}
            />
          </label>
        </form>
        <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {filteredLabs?.map((labo) => (
            <Col lg={12} md={12} xs={12} key={labo._id}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`lab-checkbox-${labo.id}`}
                  checked={selectedLabs.some(lab => lab._id === labo._id)}
                  onChange={(e) => handleCheckboxChange(e, labo)}
                />
                <label className="form-check-label" htmlFor={`lab-checkbox-${labo.id}`}>
                  {labo.PharmacyName}
                </label>
              </div>
            </Col>
          ))}
        </div>
      </div>
    </div>
            </Collapse>
          </li> */}
        </ul>
      </div>
    </div>
  </div>
  
  </div>

  {/* secound section start */}
  <div className="col-lg-8 col-md-12">
  {selectedLabs.length > 0 ? (
    <div className="selected-labs">
     
      {selectedLabs.map((lab) => (
        <Pharmacysec
          key={lab.id}
          hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${lab.Pharmacyphoto}`}
          mainheading={lab.PharmacyName}
          headings={lab.address}
          starttime1={lab.PharmacyStartTime1}
          endtime1={lab.PharmacyEndTime1}
          starttime2={lab.PharmacyStartTime2}
          endtime2={lab.PharmacyEndTime2}
          starttime3={lab.PharmacyStartTime3}
          endtime3={lab.PharmacyEndTime3}
          dayslab1={lab.DaysPharmacy1}
          dayslab2={lab.DaysPharmacy2}
          dayslab3={lab.DaysPharmacy3}
          locationmap={lab.Location}
          imagelink={lab.website}
           Labid={lab._id}
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
                                    onChange={handleInputChange}
                                  />
                                </label>
                              </form>
                              
                            </div>
                          </div>
    
      {filteredPharmacies.map((lab) => (
      <Pharmacysec
        key={lab.id}
        hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${lab.Pharmacyphoto}`}
        mainheading={lab.PharmacyName}
        headings={lab.address}
        starttime1={lab.PharmacyStartTime1}
        endtime1={lab.PharmacyEndTime1}
        starttime2={lab.PharmacyStartTime2}
        endtime2={lab.PharmacyEndTime2}
        starttime3={lab.PharmacyStartTime3}
        endtime3={lab.PharmacyEndTime3}
        dayslab1={lab.DaysPharmacy1}
        dayslab2={lab.DaysPharmacy2}
        dayslab3={lab.DaysPharmacy3}
        locationmap={lab.Location}
        imagelink={lab.website}
        Labid={lab._id}
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

export default Pharmacy





