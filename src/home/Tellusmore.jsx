import React ,{useEffect,useState}from 'react'
import { MdArrowForwardIos } from 'react-icons/md';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import Pagetitle from '../patients/Pagetitle';
import { Container,Col,Row } from 'react-bootstrap';
import axios from 'axios';




function Tellusmore() {
      const [termsData, setTermsData] = useState([]);

      const selectedtellusmore = localStorage.getItem('selectedtellusmore');

useEffect(() => {
  const fetchTermsAndConditions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/LearnMorebynetwork/${selectedtellusmore}`
      );
      console.log('API Response:', response.data); // Log the API response data
     if (Array.isArray(response.data)) {
          setTermsData(response.data); // Set array of terms
        } else {
          setTermsData([response.data]); // Wrap single object in an array
        }
    } catch (error) {
      console.error('Error fetching terms and conditions:', error);
      setTermsData([]); // Set termsData to empty array on error
    }
  };

  if (selectedtellusmore) {
    fetchTermsAndConditions();
  }
}, [selectedtellusmore]);
  return (
    <>
  <Modalnavigationbar />
      <div className="page-title-area">
        <Pagetitle
          heading="Tell us more"
          pagetitlelink="/"
          title1="Home"
          title2="Terms"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="services-area ptb-70 pb-5">
        <Container>
          <Row className="justify-content-center" id="loginPanel">
            <Col md={12} lg={10}>
              {termsData.length > 0 ? (
                <div className="research-details-desc">
                  {termsData.map((term, index) => (
                    <React.Fragment key={index}>
                      <h3>{term.Network}</h3>
                      <p dangerouslySetInnerHTML={{ __html: term.Description }}></p>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <p>No terms and conditions found for {selectedtellusmore}</p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Tellusmore