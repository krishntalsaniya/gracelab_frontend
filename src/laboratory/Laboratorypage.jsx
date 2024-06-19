import React, { useEffect, useState } from 'react';
import Pagetitle from '../patients/Pagetitle'
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Button, Collapse,CardBody} from 'react-bootstrap'
import { FiPlus ,FiMinus} from "react-icons/fi";
import { Link } from 'react-router-dom';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { Hospitalad,Hospitallable,Hospitalname } from '../hospital/Hospitallable';
import Hospitalsearch from '../hospital/Hospitalsearch';
import Hospitaldesc from '../hospital/Hospitaldesc';
import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import DataTable from "react-data-table-component";


function Laboratorypage() {
  const [loc, setloc] = useState(null)
  const [lab, setlab] = useState(null)
  const [labtest, setlabtest] = useState(null)
  const [hospitalData, setHospitalData] = useState([]);
  const [lablistall, setLablistall] = useState([]);
  const [labsPerPage] = useState(5); 
  const [query, setQuery] = useState("");
  const [labList, setLabList] = useState([]);
  const [perPage, setPerPage] = useState(10);
const [pageNo, setPageNo] = useState(0);

  
  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const location = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listLaborateriesByParams`,
          {
            skip: 0,
            per_page: 1000,
            sorton: "",
            sortdir: "",
            match: query,
            isActive: true,
          })

        console.log("fetch all location data  :",location);
        
        setloc(location.data[0].data);
        console.log("all", location.data);
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    fetchAllLocations();

    const fetchAllLaboratories = async () => {
      try {
        // Define parameters for pagination, sorting, and filtering
        const pageNo = 1; // Example page number
        const perPage = 10; // Example number of items per page
        const column = 'LabName'; // Example column to sort on
        const sortDirection = 'asc'; // Example sort direction
       
        const filter = true; // Example filter for active laboratories

        const skip = (pageNo - 1) * perPage;

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listLaborateriesByParams`,
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

        setLabList(activeLaboratories);
        const uniqueList = new Set() ;
        labList.forEach((e)=>uniqueList.add(e.LabName)); 
        console.log("osetoooooo",uniqueList);
        
      } catch (error) {
        console.error('Error fetching laboratories:', error);
      }
    };

    fetchAllLaboratories();

    const fetchLaboratorytest = async  () => {

      try{
        const test = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getAllLabTests`
        );
        const laboratorytest = test.data.filter(

          (laboratorytestactive) => laboratorytestactive.IsActive
        );
        setlabtest(laboratorytest)
        // console.log("labtest",test.data)
      }catch (error)
      {
        console.log("errors: ",error)
      }
    }
    fetchLaboratorytest();


    const lablist = async  () => {

      try{
        const labt = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/listLaborateries`
        );

        const alllablistisactive = labt.data.filter(
          (laboratoruisactive)=> laboratoruisactive.isActive
        );
        setLablistall(alllablistisactive)
        console.log("lablistactivelab",labt.data)
      }catch (error)
      {
        console.log("errors: ",error)
      }
    }
    lablist();
  
  }, [query]);
  
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [showMore, setShowMore] = useState(false); 
    const [laboratoryshowMore, laboratorysetShowMore] = useState(false); 
    const [populartestshowMore, populartestsetShowMore] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);
   
    const toggleShowMore = (event) => {
      event.preventDefault();
      setShowMore(!showMore);
    };
    const laboratorytoggleShowMore = (event) => {
      event.preventDefault();
      laboratorysetShowMore(!laboratoryshowMore);
    };
    const populartesttoggleShowMore = (event) => {
      event.preventDefault();
      populartestsetShowMore(!populartestshowMore);
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

      
      const [selectedCityLabs, setSelectedCityLabs] = useState({});
      const handleInputChangelocation = (e, cityName) => {
        const { checked } = e.target;
    
        setSelectedCityLabs((prev) => ({
          ...prev,
          [cityName]: checked
            ? loc.filter((lab) => lab.cityInfo?.Name === cityName)
            : [],
        }));
      }
      
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

      
      const handleCheckboxChangelocation = (e, city) => {
        const isChecked = e.target.checked;
    
        if (isChecked) {
          // Add labo to selectedLabs if checked
          setSelectedLabs([...selectedLabs, city]);
        } else {
          // Remove labo from selectedLabs if unchecked
          setSelectedLabs(selectedLabs.filter(lab => lab._id !== city._id));
        }
      };

  return (
    <>

<Modalnavigationbar 
navigatelink="/laboratory-login"

/>
    <div className="page-title-area">
    <Pagetitle  
    heading="LABORATORY"
    pagetitlelink="/"
    title1="Home"
    title2="Laboratory"
    IconComponent={MdArrowForwardIos}
    />
</div>

{/* section start */}

<section className="services-details-area ptb-50 main-laboratory-section">
<Container>
      <Row>
      <Col lg={12} md={12} xs={12} className="mb-20">
          <div className="ad-image position-relative">
            <Image src={hospitalad} fluid />
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
          <Link className="accordion-title active" onClick={toggleAccordion1}> Location{open1 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
             <Collapse in={open1}>
            <div className="widget-area">

             <div className="widget widget_search">
                <form className="search-form">
                <label>
                    <span className="screen-reader-text"></span>
                    <input type="search"
                     className="search-field"
                      placeholder="Search..." 
                      onChange={handleInputChangelocation} 
                      
                      />
                  </label>
                </form>
                <div className="row mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {loc && loc?.map((city) => (
                city.cityInfo && city.cityInfo.Name && (
                  <Col lg={12} md={12} xs={12} key={city._id}>
                    <div className="form-check">
                      <input type="checkbox"
                       className="form-check-input"
                        id={`city-${city._id}`} 
                        onChange={(e) => handleCheckboxChangelocation(e, city)} />
                      <label className="form-check-label" htmlFor={`city-${city._id}`}>{city.cityInfo.Name}</label>
                    </div>
                  </Col>
                )
              ))}
                  
      </div>
              </div>

            </div>
             </Collapse>
          </li>
          <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion2}> Laboratory Name{open2 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
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
                  <button type="submit"><IoSearch /></button>
                </form>
                <div className="row mt-3" style={{ maxHeight: '170px', overflowY: 'auto' }}>
                {labList?.map((labo) => (
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
        {labo.LabName} 
      </label>
    </div>
  </Col>
))}

          {laboratoryshowMore && labList?.map((labo) => (
            <Hospitallable label={labo.LabName} size="12" />
          ))}
                
                {laboratoryshowMore ? (
        <Link onClick={laboratorytoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={laboratorytoggleShowMore} className='view-more'>View More</Link>
      )}
                 </div>
              </div>
            </div>
            </Collapse>
          </li>
          <li className="accordion-item">
          <Link className="accordion-title" onClick={toggleAccordion3}>Popular Test {open3 ? <FiMinus className='hospital-icon' /> : <FiPlus className='hospital-icon' />}</Link>
            <Collapse in={open3}>
            <div className="widget-area">
              <div className="widget widget_search">
                <form className="search-form">
                <Hospitalsearch />
                </form>
                <div className="row mt-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {labtest?.map((laboratorytest) => (
                <Hospitallable label={laboratorytest.TestName} size="12" />
              ))}
                  
          {populartestshowMore && labtest?.map((laboratorytest) => (
            <Hospitallable label={laboratorytest.TestName} size="12" />
          ))}
                
                {populartestshowMore ? (
        <Link onClick={populartesttoggleShowMore} className='view-more'>View Less</Link>
      ) : (
        <Link onClick={populartesttoggleShowMore} className='view-more'>View More</Link>
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
      <h4>Selected Laboratories</h4>
      {selectedLabs.map((lab) => (
        <Hospitaldesc
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
        />
      ))}
    </div>
  ) : (
    <div className="all-labs">
      <h4>All Laboratories</h4>
      {lablistall.map((lab) => (
        <Hospitaldesc
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
        />
      ))}
    </div>
  )}
</div>


      </Row>

        {/* Pagination */}
        {/* {lablistall.length > labsPerPage && (
            <nav className="pagination-area">
              <ul className="pagination justify-content-center">
                {Array(Math.ceil(lablistall.length / labsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          )} */}
    </Container>
    
    </section>
    
    </>
  )
}

export default Laboratorypage