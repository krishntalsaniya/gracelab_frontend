import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { MdArrowForwardIos } from "react-icons/md";
import { Hospitalad, Hospitallable, Hospitalname } from '../hospital/Hospitallable';
import hospitalad from '../img/hospitalad.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import sterling from '../img/sterling_logo.jpg'
import rightarrow from '../img/right_arrow.png'
import calander from '../img/calendar.svg'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaRegSquare } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import Doctorsec from '../doctor/Doctorsec';
import drimage from '../img/drimage.jpg';
import {Common,Sterlingicon} from './Common';


function Sterling() {
  return (
    <>
    
    <Modalnavigationbar navigatelink="/sign-up" />
    <div className="page-title-area">
    <Pagetitle  
    heading="STERLING HOSPITAL"
    pagetitlelink="/"
    title1="Home"
    title2="Hospital"
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

<div class="col-lg-10 col-md-12">
                    <div class="services-sidebar laboratory-detail">
                        <div class="services-list">

                            <div class="hospital-part">
                                <div class="row align-items-center">
                                    <div class="col-md-3">
                                        <div class="hospital-logo">
                                            <img src={sterling} class="img-fluid" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="hospital-info">
                                            <h5 class="hospital-name"> Sterling Hospital</h5>
                                            <p class="hospital-location">Racecourse, Vadodara</p>
                                            <p class="hospital-types">Multi-Speciality Hospital • <span
                                                    class="text-success fw-bold"> 24 x 7 Open </span> </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="hospital-action">
                                            <a href="#"> <img src={rightarrow} style={{width:20,height:20}} /> Get Directions</a>
                                            <a href="#"> <img src={calander}
                                                    style={{width:20,height:20}} /> Book Appointment</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </div>

                        <Tabs>
                <TabList>
                  <Tab>
                    
                    <FaRegSquare className='tab_icon' /> Overview
                  </Tab>
                  <Tab>
                    <FaRegSquare className='tab_icon' />  Doctors
                  </Tab>
                  <Tab>
                    <FaRegSquare className='tab_icon' />  Treatments
                  </Tab>
                  <Tab>
                     <FaRegSquare className='tab_icon' /> Amenities
                  </Tab>
                  <Tab>
                     <FaRegSquare className='tab_icon' /> Contact
                  </Tab>
                  <Tab>
                     <FaRegSquare className='tab_icon' /> Gallery
                  </Tab>
                </TabList>

                <TabPanel>
                  <div className="products-details-tab-content">
                    <h3 className="title">About Sterling Hospital</h3>
                    <p>
                      Sterling Hospital, a unit of Sterling Add Life India Pvt Ltd., a 220 bedded multi specialty and tertiary Care Centre, situated at Race Course Circle (west) Vadodara. Sterling Hospital has state-of-the art infrastructure and is equipped to offer healthcare services in specialties, and Super specialties backed by specialised facilities, value added services and 24 hour services. The hospital is one place diagnostic and treatment center with excellence & patient-friendly ambience. With medical expertise supported by the latest equipments, offer healthcare treatment of International standards including diagnostics tests at the hospital.
                    </p>
                    <p>
                      Care with compassion has been the guiding principle of hospital. By bringing together all the patient services & activities, the hospital builds a unified atmosphere that helps to provide patients with the most effective personalised care. With a team of some of the finest medical talent, the latest equipment and state-of-the-art facilities, Sterling hospital, Vadodara has raised the National standards for healthcare, placing Gujarat on the Global healthcare map. Sterling hospital has now become the first preference for Gujarat born NRIs from the US, UK and African countries, for their healthcare needs. Over the years, Sterling Hospitals has gained astounding success in the provision and advancement of tertiary healthcare in Gujarat. Ever since its inception (2006); Sterling Hospital has a good reputation for its humane and patient centric staff as well as precise and accurate management. We are working in close co-operation to take care of the patient in an empathetic manner.
                    </p>
                    <h3 className="title">Salient Features:</h3>
                    <ul className="about-features-list">
                      <li><FaCheck  style={{ color: '#eb268f' }} /> First corporate hospital to be accredited with NABH in South Gujarat.</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Government approved Renal Transplant Unit.</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Pathology Department Vadodara is ISO 9001: 2008.</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Highest dialysis procedure recorded in the region.</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Fully equipped 24×7 Emergency services.</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Ultra-modern Diagnostic lab providing facilities for performing 2D Echo, Audiometry, CT Scanning, DSA Lab, EMG, Holter</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Monitoring, Mammography, Spirometry, TMT Ultrasound, Urodynamic Study, X-ray etc.</li>
                      <li><FaCheck   style={{ color: '#eb268f' }} /> Hospital provides Lab & transfusion services like Blood Storage, Blood Transfusion, Clinical Biochemistry, Clinical Microbiology.</li>
                      <li><FaCheck  style={{ color: '#eb268f' }} /> Facility has advanced set-up for Bone Marrow Transplant headed by experienced oncologist providing the broad spectrum of Leukemia.</li>
                    </ul>
                  </div>
                </TabPanel>

                <TabPanel>
                                             <div class="row">
                                            <div class="col-lg-4 col-md-6 col-12">
                                            <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation=" Gynaecologist, Zydus Hospital"
      location="Alkapuri"
      />
                                          

                                                </div>
                                            <div class="col-lg-4 col-md-6 col-12">
                                            <Doctorsec
      drimage={drimage}
      drname="Dr. Name"
      drlocation="ENT Speciality, Sterling Hospital"
      location="Alkapuri"
      />
                                          

                                                </div>
                                                </div>
                </TabPanel>

                <TabPanel>
                <div class="products-details-tab-content">
                                            <div class="product-review-form">
                                                <div class="review-comments row">
                                                    <div class="col-lg-6 col-12">
                                                        <Common />
                                                    </div>
                                                    <div class="col-lg-6 col-12">
                                                    <Common />
                                                    </div>
                                                    <div class="col-lg-6 col-12">
                                                    <Common />
                                                    </div>
                                                    <div class="col-lg-6 col-12">
                                                    <Common />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                </TabPanel>

                <TabPanel>
                <div class="products-details-tab-content">
                                            <div class="col-lg-12 col-md-12">
                                                <div class="research-details-features">
                                                    <div class="row">
                                                    <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                        
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                        
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                        
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                        
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                        
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                        
                                                        <div class="col-lg-3 col-md-6 col-sm-6 sterling_icon">
                                                        <Sterlingicon />
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>

                </TabPanel>

                <TabPanel>
                  <h3>Contact</h3>
                  {/* Add content for Contact */}
                </TabPanel>

                <TabPanel>
                  <h3>Gallery</h3>
                  {/* Add content for Gallery */}
                </TabPanel>
              </Tabs>
                        </div>
      </Row>
    </Container>
    
    </section>
    
    </>
  )
}

export default Sterling