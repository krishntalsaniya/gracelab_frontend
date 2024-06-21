import React from 'react'
import Modalnavigationbar from '../navbar/Modalnavigationbar'
import Pagetitle from '../patients/Pagetitle'
import { MdArrowForwardIos } from "react-icons/md";
import about1 from '../img/image1.jpg'
import about2 from '../img/image2.jpg'
import { Container, Row, Col } from 'react-bootstrap';
import counterimage from '../img/counter_image.png'
import Counter from './Counter';
import CountUp from 'react-countup';
import { IoCheckmarkDoneSharp} from "react-icons/io5";
import { Link } from 'react-router-dom';
import Program from '../home/Program';
import Network from '../home/Network';
import icon1 from '../img/icon1.png'
import icon2 from '../img/icon2.png'
import icon3 from '../img/icon3.png'
import icon4 from '../img/icon4.png'
import icon5 from '../img/icon5.png'




function About() {

  
  return (
    <>
    
<Modalnavigationbar navigatelink="/sign-up" />
    <div className="page-title-area">
    <Pagetitle  
    heading="About Us"
    pagetitlelink="/"
    title1="Home"
    title2="About"
    IconComponent={MdArrowForwardIos}
    />
</div>

<section className="about-our-company ptb-120 pb-0">
      <Container>
        <Row className="align-items-center">
        <Col lg={6} md={12}>
            <div className="about-content">
              <span>About Company</span>
              <h2>Welcome to Grace Labs</h2>
              <p>
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
              </p>
              <p>
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
                Text will be coming soon...Text will be coming soon...Text will be coming soon...Text will be coming soon...
              </p>
              <ul className="about-features-list">
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Streamlined Operations</li>
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Patient Loyalty Rewards</li>
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Multi-Facility Redemption</li>
                <li><IoCheckmarkDoneSharp style={{ color: '#ffb923' }} /> Enhanced Patient Satisfaction</li>
              </ul>
              
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="about-company-image">
              <img src={about2} alt="About Company" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* <div className="funfacts-area">
      <Container>
        <Row>
          <Counter count = {<CountUp end={28} duration={10}/>} title='Stars Comfort' />
          <Counter count = {<CountUp end={50} duration={10}/>} title='Professional Staff' />
          <Counter count = {<CountUp end={100} duration={10}/>} title='Years Of Experience' />
          <Counter count = {<CountUp end={30} duration={10}/>} title='Suppliers' />  
        </Row>
      </Container>
      <div className="map-box1"><img src={counterimage} alt="Counter Image" /></div>
    </div> */}


    {/* counter section start */}
  



      <div className="about-our-company-inner">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12}>
              <div className="about-inner-company-image">
                <img src={about1} alt="About Company Inner" />
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="about-inner-company-content">
                <h2>We Discoveries We Give Your Solution</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>


    </>
  )
}

export default About