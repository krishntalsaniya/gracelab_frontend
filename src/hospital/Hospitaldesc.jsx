import React ,{useState,useEffect}from 'react'
import { FaMapMarker } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row } from 'react-bootstrap';
import axios from 'axios';


function Hospitaldesc(props) {

  const [dayName, setDayName] = useState('');
  const [dayName2, setDayName2] = useState('');
  const [dayName3, setDayName3] = useState('');

  useEffect(() => {
    const fetchDayName = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab1}`);
        setDayName(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName();

    const fetchDayName2 = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab2}`);
        setDayName2(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName2();

    const fetchDayName3 = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab3}`);
        setDayName3(response.data.Days);
      } catch (error) {
        console.error('Error fetching day name:', error);
      }
    };

    fetchDayName3();
  }, [props.dayslab1,props.dayslab2,props.dayslab3]);
  return (
    <>

<Card className="single-research-box">
  <Row>
    <Col lg={6} md={6} sm={12}>
    <div className="research-image">
        <Link to={props.imagelink} target='_blank'><Image src={props.hospitalimage} alt="image" /></Link>
      </div>
    </Col>
    <Col lg={6} md={6} sm={12}>
          
    <Card.Body className="research-content">
        {/*<span>Pathology</span>*/}
        <h3><Link to="#">{props.mainheading}</Link></h3>
        
        <div className="location-marker-section">
   <Link to={props.locationmap} target='_blank'><h5 className="mt-3 d-inline-block me-2"><FaMapMarker className='map-color' /> {props.headings}</h5></Link>
</div>

<div className="location-marker-section">
    <h5 className="mt-3 d-inline-block me-2"><IoMdTimer className='map-color' /> {props.starttime1} - {props.endtime1} - {dayName}   <br /> <br />
    <IoMdTimer className='map-color' /> {props.starttime2} -   {props.endtime2} - {dayName2}   <br /> <br />
    <IoMdTimer className='map-color' />{props.starttime3} -   {props.endtime3} -  {dayName3}   </h5>
</div>
      </Card.Body>
    </Col>
  </Row>

    </Card>
    
    </>
  )
}

export default Hospitaldesc