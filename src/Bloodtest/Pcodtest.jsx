import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Modal, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import placeholderimage from "../img/placeholder.jpeg";
import { useParams } from "react-router-dom";
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";

const TestTypes = [
  { id: 1, name: "Pregnancy Blood Test" },
  { id: 2, name: "Blood Test For Kids" },
  { id: 3, name: "Full Body Checkup" },
  { id: 4, name: "Health checkup for senior citizen (male)" },
  { id: 5, name: "Health checkup for senior citizen (Female)" },
  { id: 6, name: "Swine Flue Test In vadodara" },
  { id: 7, name: "Serology Blood Test" },
  { id: 8, name: "Blood Ige Test in vadodara" }
];

function Pcodtest() {
  const [showModal, setShowModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });
  const [showMore, setShowMore] = useState(null); // Track which card's description is expanded

  const { testName } = useParams(); // Extract testName from route params

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItemId) {
      console.error("No item selected");
      return;
    }

    try {
      const dataToSend = { ...formData };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/TestDetails/${selectedItemId}`,
        dataToSend
      );

      console.log("Form submitted successfully:", response.data);
      toast.success("Inquiry was successfully received!");

      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        message: "",
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("There was an error submitting your inquiry.");
    }
  };
const selectedTestId = "9";
          console.log("Selected Test ID:", selectedTestId);
  useEffect(() => {
    const fetchCMSContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getallTestDetails`
        );

        console.log("API Response:", response.data); // Debugging: Check API response
        console.log("TestTypes:", TestTypes); // Debugging: Check TestTypes

        if (Array.isArray(response.data) && response.data.length > 0) {
          setBlog(response.data);

          // Extract selectedTest ID from the response data
           // Debugging: Check selectedTest ID

          // Find the matching test type based on the selectedTest ID
          const matchedTestType = TestTypes.find(test => test.id.toString() === selectedTestId);
          console.log("Matched Test Type:", matchedTestType); // Debugging: Check matched test type

          if (matchedTestType) {
            // Find the item with the matching selectedTest ID
            const matchedItem = response.data.find(item => item.selectedTest === matchedTestType.id.toString());
            console.log("Matched Item:", matchedItem); // Debugging: Check matched item

            if (matchedItem) {
              setSelectedItemId(matchedItem._id); // Set the selected item ID
            }
          }
        } else {
          console.error("Unexpected response format or empty data:", response.data);
          setBlog([]);
        }
      } catch (error) {
        console.error("Error fetching CMS content:", error);
        setBlog([]);
      }
    };

    fetchCMSContent();
  }, [testName]);

  return (
    <>
      <Modalnavigationbar />

      <div className="page-title-area">
        <Pagetitle
          heading="PCOD Blood Test"
          pagetitlelink="/"
          title1="Home"
          title2="PCOD Blood Test"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="about-area ptb-120">
        <Container>
          <Row>
            {blog
              .filter(item => item._id === selectedItemId)
              .map(item => (
                <Col lg={4} md={6} key={item._id} className="mb-4">
                  <Card className="test-card">
                    <Card.Img
                      variant="top"
                      src={`${process.env.REACT_APP_API_URL_GRACELAB}/${item.Images}`}
                      alt="Test"
                      onError={(e) => { e.target.src = placeholderimage }}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                      <Card.Title>{item.Title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Test Name: {item.TestName}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Price: {item.Price}</Card.Subtitle>

                      <Card.Text>
                        {showMore === item._id ? 
                          <div dangerouslySetInnerHTML={{ __html: item.Description }} />
                          :
                          <div dangerouslySetInnerHTML={{ __html: item.Description.slice(0, 100) + '...' }} />
                        }
                      </Card.Text>
                      <Button
                        variant="link"
                        onClick={() => setShowMore(showMore === item._id ? null : item._id)}
                      >
                        {showMore === item._id ? "Show Less" : "Show More"}
                      </Button>

                      <div className="btn-box mt-3">
                        <Button
                          variant="primary"
                          className="btn-login"
                          onClick={() => {
                            setSelectedItemId(item._id);
                            setShowModal(true);
                          }}
                        >
                          Inquiry
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
        </Container>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formMobileNo">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Pcodtest;
