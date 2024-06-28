import React, { useEffect, useState } from 'react';
import Pagetitle from '../patients/Pagetitle';
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button, Collapse } from 'react-bootstrap';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Hospitaldesc from '../hospital/Hospitaldesc';
import { MdArrowForwardIos } from 'react-icons/md';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';
import { Hospitallable } from '../hospital/Hospitallable';
import Labsec from './Labsec';


function Laboratorypage() {
  const [loc, setLoc] = useState([]);
  const [labTest, setLabTest] = useState([]);
  const [labListAll, setLabListAll] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);
  const [laboratoryShowMore, laboratorySetShowMore] = useState(false);
  const [popularTestShowMore, popularTestSetShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [loading, setLoading] = useState(true);
      const [adsData, setAdsData] = useState([]);
  const [hospitalad, setHospitalad] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuertest, setSearchQuerytest] = useState('');
    const [advertisement, setadvertisement] = useState(null)

  const labsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listLaborateriesByLocation`,
          {
            skip: 0,
            per_page: labsPerPage,
            sorton: 'LabName',
            sortdir: 'asc',
            match: {
              City: selectedCities.length > 0 ? selectedCities : undefined,
              LabTests: selectedTest.length > 0 ? selectedTest : undefined,
            },
            isActive: true,
          }
        );
        const laboratories = response.data;
        setLabListAll(laboratories);
      } catch (error) {
        console.error('Error fetching laboratories:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLaboratoryTest = async () => {
      try {
        const test = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getAllLabTests`
        );
        const laboratoryTest = test.data.filter((laboratoryTestActive) => laboratoryTestActive.IsActive);
        setLabTest(laboratoryTest);
      } catch (error) {
        console.error('Error fetching laboratory tests:', error);
      }
    };

    const labLocation = async () => {
      try {
        const labt = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/location/city`
        );
        const allLabListIsActive = labt.data.filter((laboratoruisActive) => laboratoruisActive.isActive);
        setLoc(allLabListIsActive);
      } catch (error) {
        console.error('Error fetching laboratory list:', error);
      }
    };

       const fetchAdsData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/customize-advertisement`);
        setAdsData(response.data);
        console.log("image doctor",response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

     const Laboratoryimage = async() =>
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
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCustomizeAdvertisementByLabSpeciality`,
                                      {
                      "skip": 0,
                      "per_page": 100,
                      "sorton": "createdAt",
                      "sortdir": "desc",
                        match: {
                      Speciality: selectedTest,    
                  },
                      "IsActive": true
                    }

                );  
                console.log("customized advertizment: ",response);
        
                // Assuming the response contains an array of laboratories
                const Laboratoryllist = response.data;
                console.log("labbbbbb",Laboratoryllist);
               

              } catch (error) {
                console.error('Error fetching laboratories:', error);
              }
            }

            Laboratoryimage();
    fetchAdsData();
    fetchData();
    fetchLaboratoryTest();
    labLocation();
  }, [selectedCities, selectedTest, labsPerPage]);

  useEffect(() => {
     const Laboratoryimage = async() =>
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
                  `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCustomizeAdvertisementByLabSpeciality`,
                                      {
                      "skip": 0,
                      "per_page": 100,
                      "sorton": "createdAt",
                      "sortdir": "desc",
                        match: {
                      Speciality: selectedTest,    
                  },
                      "IsActive": true
                    }

                );  
                console.log("customized advertizment: ",response);

        
                // Assuming the response contains an array of laboratories
                const Adimage = response.data[0].data[0].CustomAdsImage;
setadvertisement(`${process.env.REACT_APP_API_URL_GRACELAB}/${Adimage}`)
                console.log("Adimage",Adimage); 
               

              } catch (error) {
                console.error('Error fetching laboratories:', error);
              }
            }

            Laboratoryimage();
  }, [])
  

  const handleCityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCities([...selectedCities, value]);
    } else {
      setSelectedCities(selectedCities.filter((city) => city !== value));
    }
  };

const handleTestChange = (event) => {
  const { value, checked } = event.target;
  
  // Create a copy of selectedTest
  let newSelectedTests = [...selectedTest];

  if (checked) {
    // Add value to newSelectedTests if checked
    newSelectedTests.push(value);
  } else {
    // Remove value from newSelectedTests if unchecked
    newSelectedTests = newSelectedTests.filter(test => test !== value);
  }

  // Update the state with newSelectedTests
  setSelectedTest(newSelectedTests);
  console.log("selected tests", newSelectedTests);

  // Find the last checked test
  const lastCheckedTest = newSelectedTests[newSelectedTests.length - 1];

  // Find an ad that matches the last checked test
  const matchedAd = adsData.find(ad => ad.LaboratorySpeciality === lastCheckedTest);

  if (matchedAd) {
    // Set the advertisement image path based on the matched ad
    const imagePath = matchedAd.CustomAdsImage;
    setHospitalad(imagePath);
    console.log("image path", imagePath);
  } else {
    // No matching ad found, clear the advertisement image
    setHospitalad(""); // Set to empty string or default image path
    console.log("No matching ad found for selected tests");
  }
};


  const toggleAccordion1 = () => setOpen1(!open1);
  const toggleAccordion2 = () => setOpen2(!open2);
  const toggleAccordion3 = () => setOpen3(!open3);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue); // Update query state on every input change
  };

  const handleCheckboxChange = (e, labo) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedLabs([...selectedLabs, labo]);
    } else {
      setSelectedLabs(selectedLabs.filter((lab) => lab._id !== labo._id));
    }
  };

  const filteredLabs = labListAll?.filter(
    (lab) => lab.LabName.toLowerCase().includes(query.toLowerCase())
  );
console.log("filteredLabs",filteredLabs);

 const filteredLocations = loc?.filter(city => 
    city.Name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


 const filteretest = labTest?.filter(city => 
    city.TestName.toLowerCase().includes(searchQuertest.toLowerCase())
  ) || [];

  const handleSearchChangetest = (event) => {
    setSearchQuerytest(event.target.value);
  };
  return (
    <>
      <Modalnavigationbar navigatelink="/laboratory-login" />
      <div className="page-title-area">
        <Pagetitle
          heading="LABORATORY"
          pagetitlelink="/"
          title1="Home"
          title2="Laboratory"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="services-details-area ptb-50 main-laboratory-section">
        <Container>
          <Row>
            <Col lg={12} md={12} xs={12} className="mb-0">
  <div className="ad-image position-relative">
    <Image 
      src={hospitalad ? `${process.env.REACT_APP_API_URL_GRACELAB}/${hospitalad}` : advertisement} 
      fluid 
    /> {/* Replace 'defaultAdImageURL' with your default ad image URL */}
    <div className="span-title">
      <span>Ad</span>
    </div>
  </div>
</Col>
            <div className="col-lg-4 col-md-12">
              <div className="services-sidebar laboratory-detail">
                <div className="services-list">
                  <div className="services-details-faq">
                    <ul className="accordion">
                      <li className="accordion-item">
                        <Link className="accordion-title active" onClick={toggleAccordion1}>
                          {' '}
                          Location{open1 ? <FiMinus className="hospital-icon" /> : <FiPlus className="hospital-icon" />}
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
                                      <label className="form-check-label" htmlFor={`city-${city._id}`}>
                                        {city.Name}
                                      </label>
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
                          {' '}
                          Popular Test{open3 ? <FiMinus className="hospital-icon" /> : <FiPlus className="hospital-icon" />}
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
                  value={searchQuertest}
                  onChange={handleSearchChangetest}
                />
              </label>
              <button type="submit"><IoSearch /></button>
            </form>
                              <div className="row mt-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {filteretest?.map((laboratoryTest) => (
                                  <Col xs={6} key={laboratoryTest._id}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={laboratoryTest._id}
                                        value={laboratoryTest._id}
                                        checked={selectedTest.includes(laboratoryTest._id)}
                                        onChange={handleTestChange}
                                      />
                                      <label className="form-check-label" htmlFor={laboratoryTest._id}>
                                        {laboratoryTest.TestName}
                                      </label>
                                    </div>
                                  </Col>
                                ))}
                                {popularTestShowMore && labTest?.map((laboratoryTest) => <Hospitallable label={laboratoryTest.TestName} size="12" />)}
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
              {loading ? (
                <div>Loading...</div>
              ) : selectedLabs.length > 0 ? (
                <div className="selected-labs">
                  {selectedLabs?.map((lab) => (
                    <Labsec
                      key={lab.id}
                      hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${lab.Labphoto}`}
                      mainheading={lab.LabName}
                      headings={lab.address}
                      starttime1={lab.LabStartTime1}
                      endtime1={lab.LabEndTime1}
                      starttime2={lab.LabStartTime2}
                      endtime2={lab.LabEndTime2}
                      starttime3={lab.LabStartTime3}
                      endtime3={lab.LabEndTime3}
                      dayslab1={lab.DaysLab1}
                      dayslab2={lab.DaysLab2}
                      dayslab3={lab.DaysLab3}
                      locationmap={lab.Location}
                      imagelink={lab.website}
                      Labid={lab._id}
                      averageRating={lab.averageRating?lab.averageRating:0}
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
                                <button type="submit"><IoSearch /></button>
                              </form>
                              
                            </div>
                          </div>
                      
                     
                  {filteredLabs?.map((lab,index) => (
  <Labsec
    key={`${lab._id}-${index}`}
    hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${lab.Labphoto}`}
    mainheading={lab.LabName}
    headings={lab.address}
    starttime1={lab.LabStartTime1}
    endtime1={lab.LabEndTime1}
    starttime2={lab.LabStartTime2}
    endtime2={lab.LabEndTime2}
    starttime3={lab.LabStartTime3}
    endtime3={lab.LabEndTime3}
    dayslab1={lab.DaysLab1}
    dayslab2={lab.DaysLab2}
    dayslab3={lab.DaysLab3}
    locationmap={lab.Location}
    imagelink={lab.website}
    Labid={lab._id}
     averageRating={lab.averageRating ? lab.averageRating : 0}  // Ensure averageRating is correctly assigned
  />
))}

                </div>
              )}
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Laboratorypage;
