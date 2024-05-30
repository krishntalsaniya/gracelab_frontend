import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarker } from "react-icons/fa";

function Doctorsec(props) {
  return (
    <>
     <div className="single-research-box">
        <div className="research-image">
          <Link to="/"><img src={props.drimage} alt="image" /></Link>
        </div>
        <div className="research-content">
          {/*<span>Pathology</span>*/}
          <h3><Link to="/">{props.drname}</Link></h3>
          <p>{props.drlocation}</p>
          <div className="location-marker-section">
            <h5 className="mt-1 d-inline-block me-2"><FaMapMarker className='map-color' />{props.location}</h5>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Doctorsec