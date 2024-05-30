import React from 'react'

import { Link } from 'react-router-dom';


function Pagetitle(props) {
  return (
<>
<div className="container">
    <div className="page-title-content">
      <h2>{props.heading}</h2>
      <ul>
      <li>
              {props.IconComponent && <props.IconComponent className='arrowright' />}
              <Link to={props.pagetitlelink}>{props.title1}</Link>
            </li>
        <li>{props.title2}</li>
      </ul>
    </div>
  </div>

</>
  )
}

export default Pagetitle