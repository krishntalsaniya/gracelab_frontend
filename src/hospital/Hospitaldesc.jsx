import React from 'react'
import { FaMapMarker } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

function Hospitaldesc(props) {
  return (
    <>

<Card className="single-research-box">
      <div className="research-image">
        <Link href="#"><Image src={props.hospitalimage} alt="image" /></Link>
      </div>
      <Card.Body className="research-content">
        {/*<span>Pathology</span>*/}
        <h3><Link to="#">{props.mainheading}</Link></h3>
        
        <div className="location-marker-section">
    <h5 className="mt-3 d-inline-block me-2"><FaMapMarker className='map-color' /> {props.headings}</h5>
</div>
<div className="location-marker-section">
    <h5 className="mt-3 d-inline-block me-2"><IoMdTimer className='map-color' /> Start Time : {props.starttime}  End Time :  {props.endtime}</h5>
</div>
      </Card.Body>
    </Card>
    
    </>
  )
}

export default Hospitaldesc