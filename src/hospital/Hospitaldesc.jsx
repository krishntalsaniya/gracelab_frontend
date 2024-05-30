import React from 'react'
import { FaMapMarker } from "react-icons/fa";
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
  {Array.isArray(props.headings) && props.headings.map((heading, index) => (
    <h5 key={index} className="mt-3 d-inline-block me-2"><FaMapMarker className='map-color' /> {heading}</h5>
  ))}
</div>
      </Card.Body>
    </Card>
    
    </>
  )
}

export default Hospitaldesc