import React, { useState, useEffect } from "react";
import Pagetitle from "../patients/Pagetitle";
import hospitalad from "../img/hospitalad.jpg";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Button, Collapse } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import {
  Hospitalad,
  Hospitallable,
  Hospitalname,
} from "../hospital/Hospitallable";
import Hospitalsearch from "../hospital/Hospitalsearch";
import drimage from "../img/drimage.jpg";
import Doctorsec from "./Doctorsec";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import Hospitaldesc from "../hospital/Hospitaldesc";
import Doctordes from "./Doctordes";

function Doctor() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [symtomsearchQuery, setsymtomSearchQuery] = useState("");
  const [open4, setOpen4] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [hospitalshowMore, hospitalsetShowMore] = useState(false);
  const [specialityshowMore, specialitysetShowMore] = useState(false);
  const [symptomshowMore, symptomsetShowMore] = useState(false);
  const [location, setlocation] = useState(null);
  const [doctorspecialist, setdoctorspecialist] = useState(null);
  const [symptomwise, setsymptomwise] = useState(null);
  const [doctorlist, setdoctorlist] = useState([]);
  const [DoctorAllList, setDoctorAllList] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedsymtoms, setSelectedsymtoms] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [hospitalad, setHospitalad] = useState(null);
  const [filteredDoctorslab, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specilitysearchQuery, specilitysetSearchQuery] = useState("");
  const [doctorad, setdoctorad] = useState(null);

  const [visibleDoctors, setVisibleDoctors] = useState(2);

  const showMoreDoctors = () => {
    setVisibleDoctors((prevVisibleDoctors) => prevVisibleDoctors + 2);
  };

    const filteredDoctors = doctorlist?.filter(
    (doctor) =>doctor.DoctorName.toLowerCase().includes(query.toLowerCase())
  );

   const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 2; // Number of doctors per page

  // Calculate indices of doctors to display on the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination component
  const Pagination = ({ totalDoctors, doctorsPerPage, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDoctors / doctorsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

   useEffect(() => {
    setFilteredDoctors(doctorlist); // Initialize filtered list with full list on component mount
  }, [doctorlist]);

  useEffect(() => {
    const Locationfetch = async () => {
      try {
        const locationcity = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/location/city`
        );
        const docotorlocation = locationcity.data.filter(
          (doctorisactive) => doctorisactive.IsActive
        );

        setlocation(docotorlocation);
        console.log("doctor list location : ", locationcity.data);
      } catch (error) {
        console.log("doctor error :", error);
      }
    };
    Locationfetch();

    const Doctorspecilist = async () => {
      try {
        const Specilitydoctor = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/DoctorSpeciality`
        );

        const specilityisactive = Specilitydoctor.data.filter(
          (specialityisactive) => specialityisactive.IsActive
        );
        setdoctorspecialist(specilityisactive);
        console.log("specilityisactive", specilityisactive);
      } catch (error) {
        console.log("Doctor Speciality error  :", error);
      }
    };
    Doctorspecilist();

    const Doctorlistall = async () => {
      try {
        const Symptom = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctorsBySpeciality`,
          {
            skip: 0,
            per_page: 10000,
            sorton: "DoctorName",
            sortdir: "asc",
            match: {
              Speciality: selectedSpecialties,
              City: selectedCities.length > 0 ? selectedCities : undefined,
              DiseasesSymptoms: selectedsymtoms,
            },
            isActive: true,
          }
        );
        console.log("symtoms data by image  ", Symptom.data);

        setdoctorlist(Symptom.data);
        console.log("location", Symptom);
        // console.log("Symptom wise data : ",Symptom.data)
      } catch (error) {
        console.log("Symptom wise data error : ", error);
      }
    };
    Doctorlistall();

    const Doctorlist = async () => {
      try {
        const pageNo = 1;
        const perPage = 1000;
        const column = "DoctorName";
        const sortDirection = "asc";
        const filter = true;
        const skip = (pageNo - 1) * perPage;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listDoctorsBySpeciality`,
          {
            skip: skip,
            per_page: 10000,
            sorton: column,
            sortdir: sortDirection,
            match: {
              Speciality:
                selectedSpecialties.length > 0
                  ? selectedSpecialties
                  : undefined,
              City: selectedCities.length > 0 ? selectedCities : undefined,
              DiseasesSymptoms:
                selectedsymtoms.length > 0 ? selectedsymtoms : undefined,
            },
            isActive: filter,
          }
        );

        console.log("data doctor: ", response.data[0]);

        const laboratories = response.data[0];
        const labdata = laboratories.data;
        const activeLaboratories = labdata.filter((lab) => lab.isActive);
        setDoctorAllList(activeLaboratories);
        console.log("doctor all list :", setDoctorAllList);
      } catch (error) {
        console.error("Error fetching laboratories:", error);
      }
    };
    Doctorlist();

    const Doctorsymtoms = async () => {
      try {
        const Doctorsymtoms = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/DiseasesSymptoms`
        );

        const specilityisactive = Doctorsymtoms.data.filter(
          (specialityisactive) => specialityisactive.IsActive
        );
        setsymptomwise(specilityisactive);
        console.log("doctor symtoms", specilityisactive);
      } catch (error) {
        console.log("doctor symtoms  :", error);
      }
    };
    Doctorsymtoms();

    const fetchAdsData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/customize-advertisement`
        );
        setAdsData(response.data);
        console.log("image doctor", response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAdsData();

    const Doctoradimage = async () => {
      try {
        // Define parameters for pagination, sorting, and filtering
        const pageNo = 1; // Example page number
        const perPage = 1000; // Example number of items per page
        const column = "LabName"; // Example column to sort on
        const sortDirection = "asc"; // Example sort direction

        const filter = true; // Example filter for active laboratories

        const skip = (pageNo - 1) * perPage;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCustomizeAdvertisementByDoctorSpeciality`,
          {
            skip: 0,
            per_page: 1000,
            sorton: "createdAt",
            sortdir: "desc",
            match: {
              Speciality: selectedSpecialties,
            },
            IsActive: true,
          }
        );
        console.log("customized advertizment: ", response);

        // Assuming the response contains an array of laboratories
        const doctorlist = response;
        console.log("labbbbbb", doctorlist);
      } catch (error) {
        console.error("Error fetching laboratories:", error);
      }
    };
    Doctoradimage();
  }, [query, selectedSpecialties, selectedCities, selectedsymtoms]);

  useEffect(() => {
    const Doctoradimage = async () => {
      try {
        // Define parameters for pagination, sorting, and filtering
        const pageNo = 1; // Example page number
        const perPage = 10; // Example number of items per page
        const column = "LabName"; // Example column to sort on
        const sortDirection = "asc"; // Example sort direction

        const filter = true; // Example filter for active laboratories

        const skip = (pageNo - 1) * perPage;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list-by-params/listCustomizeAdvertisementByDoctorSpeciality`,
          {
            skip: 0,
            per_page: 100,
            sorton: "createdAt",
            sortdir: "desc",
            match: {
              Speciality: selectedSpecialties,
            },
            IsActive: true,
          }
        );
        // console.log("customized advertizment: ",response.data[0].data[0].CustomAdsImage);

        // Assuming the response contains an array of laboratories
        const doctoradimage = response.data[0].data[0].CustomAdsImage;
        setdoctorad(
          `${process.env.REACT_APP_API_URL_GRACELAB}/${doctoradimage}`
        );
      } catch (error) {
        console.error("Error fetching laboratories:", error);
      }
    };
    Doctoradimage();
  }, []);

  const handleSpecialtyChange = (event) => {
    const { value, checked } = event.target;

    // Create a copy of selectedSpecialties
    let newSelectedSpecialties = [...selectedSpecialties];

    if (checked) {
      // Add value to newSelectedSpecialties if checked
      newSelectedSpecialties.push(value);
    } else {
      // Remove value from newSelectedSpecialties if unchecked
      newSelectedSpecialties = newSelectedSpecialties.filter(
        (specialty) => specialty !== value
      );
    }
    setdoctorlist([])

    // Update the state with newSelectedSpecialties
    setSelectedSpecialties(newSelectedSpecialties);

    // Find the last checked specialty
    const lastCheckedSpecialty =
      newSelectedSpecialties[newSelectedSpecialties.length - 1];

    // Find an ad that matches the last checked specialty
    const matchedAd = adsData.find(
      (ad) => ad.DoctorSpeciality === lastCheckedSpecialty
    );

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
      setSelectedCities(selectedCities.filter((city) => city !== value));
    }
    setdoctorlist([])
  };

  const handlesymtomsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedsymtoms([...selectedsymtoms, value]);
    } else {
      setSelectedsymtoms(
        selectedsymtoms.filter((symtoms) => symtoms !== value)
      );
    }
    // setdoctorlist([])
    
  };

  const filterespecility =
    doctorspecialist?.filter((city) =>
      city.Speciality.toLowerCase().includes(specilitysearchQuery.toLowerCase())
    ) || [];

  const handlespeciality = (event) => {
    specilitysetSearchQuery(event.target.value);
  };

  const filtersymtom =
    symptomwise?.filter((city) =>
      city.Symptom.toLowerCase().includes(symtomsearchQuery.toLowerCase())
    ) || [];

  const handlespecialitysymtom = (event) => {
    setsymtomSearchQuery(event.target.value);
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
      setSelectedLabs(selectedLabs.filter((lab) => lab._id !== labo._id));
    }
  };

  const filteredLabs = DoctorAllList?.filter((lab) =>
    lab.DoctorName.toLowerCase().includes(query.toLowerCase())
  );
  const filteredLocations =
    location?.filter((city) =>
      city.Name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


    useEffect(() => {
    // Filter pharmacies whenever searchTerm changes
    const filtered = doctorlist.filter(doctor =>
      doctor.DoctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctorlist]);


  useEffect(() => {
    // Filter pharmacies whenever query changes
    const filtered = doctorlist?.filter((doctor) =>
      doctor.DoctorName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [query, doctorlist]);











  return (
    <>
      <Modalnavigationbar navigatelink="/doctor-login" />
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
            <Col lg={12} md={12} xs={12} className="mb-0">
              <div className="ad-image position-relative">
                <Image
                  src={
                    hospitalad
                      ? `${process.env.REACT_APP_API_URL_GRACELAB}/${hospitalad}`
                      : doctorad
                  }
                  fluid
                />{" "}
                {/* Replace 'defaultAdImageURL' with your default ad image URL */}
                <div className="span-title">
                  <span>Ad</span>
                </div>
              </div>
            </Col>

            {/* left side section start */}

            <div className="col-lg-4 col-md-12">
              <div className="services-sidebar laboratory-detail">
                <div className="services-list">
                  <div className="services-details-faq">
                    <ul className="accordion">
                      <li className="accordion-item">
                        <Link
                          className="accordion-title active"
                          onClick={toggleAccordion1}
                        >
                          Location{" "}
                          {open1 ? (
                            <FiMinus className="hospital-icon" />
                          ) : (
                            <FiPlus className="hospital-icon" />
                          )}
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
                                <button type="submit">
                                  <IoSearch />
                                </button>
                              </form>
                              <div
                                className="row mt-3"
                                style={{
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                }}
                              >
                                {filteredLocations?.map((city) => (
                                  <Col sm={6} lg={6} xs={12} key={city._id}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`city-${city._id}`}
                                        value={city._id}
                                        onChange={handleCityChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`city-${city._id}`}
                                      >
                                        {city.Name}
                                      </label>
                                    </div>
                                  </Col>
                                ))}

                                {/* {showMore && location?.map((city) => (
                <Hospitallable label={city.Name} size="6" />
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
                        <Link
                          className="accordion-title"
                          onClick={toggleAccordion3}
                        >
                          Speciality{" "}
                          {open3 ? (
                            <FiMinus className="hospital-icon" />
                          ) : (
                            <FiPlus className="hospital-icon" />
                          )}
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
                                <button type="submit">
                                  <IoSearch />
                                </button>
                              </form>
                              <div
                                className="row mt-3"
                                style={{
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                }}
                              >
                                {filterespecility?.map((specialty) => (
                                  <Col  xs={12} sm={6} md={6} lg={window.innerWidth >= 1024 ? 12 : 6} key={specialty._id}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={specialty._id}
                                        value={specialty._id}
                                        checked={selectedSpecialties.includes(
                                          specialty._id
                                        )}
                                        onChange={handleSpecialtyChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={specialty._id}
                                      >
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
                        <Link
                          className="accordion-title"
                          onClick={toggleAccordion4}
                        >
                          Symtoms{" "}
                          {open4 ? (
                            <FiMinus className="hospital-icon" />
                          ) : (
                            <FiPlus className="hospital-icon" />
                          )}
                        </Link>
                        <Collapse in={open4}>
                          <div className="widget-area">
                            <div className="widget widget_search">
                              <form className="search-form">
                                <label>
                                  <span className="screen-reader-text"></span>
                                  <input
                                    type="search"
                                    className="search-field"
                                    placeholder="Search..."
                                    value={symtomsearchQuery}
                                    onChange={handlespecialitysymtom}
                                  />
                                </label>
                                <button type="submit">
                                  <IoSearch />
                                </button>
                              </form>
                              <div
                                className="row mt-3"
                                style={{
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                }}
                              >
                                {filtersymtom?.map((specialty) => (
                                  <Col xs={12} sm={6} lg={6} md={6} key={specialty._id}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={specialty._id}
                                        value={specialty._id}
                                        checked={selectedsymtoms.includes(
                                          specialty._id
                                        )}
                                        onChange={handlesymtomsChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={specialty._id}
                                      >
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
                  {selectedLabs.map((doc, index) => (
                    <Doctordes
                      key={`${doc._id}-${index}`}
                      hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${doc.Doctorphoto}`}
                      mainheading={doc.DoctorName}
                      headings={doc.address}
                      starttime1={doc.OPD1StartTime}
                      endtime1={doc.OPD1EndTime}
                      starttime2={doc.OPD2StartTime}
                      endtime2={doc.OPD2EndTime}
                      starttime3={doc.OPD3StartTime}
                      endtime3={doc.OPD3EndTime}
                      dayslab1={doc.DaysDoctor1}
                      dayslab2={doc.DaysDoctor2}
                      dayslab3={doc.DaysDoctor3}
                      locationmap={doc.Location}
                      imagelink={doc.website}
                      Labid={doc._id}
                      averageRating={doc.averageRating}
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
                            placeholder="Search Doctor..."
                            onChange={handleInputChange}
                          />
                        </label>
                        <button type="submit">
                          <IoSearch />
                        </button>
                      </form>
                    </div>
                  </div>

                {currentDoctors.map((doc, index) => (
        <Doctordes
          key={`${doc._id}-${index}`}
          hospitalimage={`${process.env.REACT_APP_API_URL_GRACELAB}/${doc.Doctorphoto}`}
          mainheading={doc.DoctorName}
          headings={doc.address}
          starttime1={doc.OPD1StartTime}
          endtime1={doc.OPD1EndTime}
          starttime2={doc.OPD2StartTime}
          endtime2={doc.OPD2EndTime}
          starttime3={doc.OPD3StartTime}
          endtime3={doc.OPD3EndTime}
          dayslab1={doc.DaysDoctor1}
          dayslab2={doc.DaysDoctor2}
          dayslab3={doc.DaysDoctor3}
          locationmap={doc.Location}
          imagelink={doc.website}
          Labid={doc._id}
          averageRating={doc.averageRating}
        />
      ))}

      <Pagination
        totalDoctors={filteredDoctors.length}
        doctorsPerPage={doctorsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
                </div>
              )}
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Doctor;
