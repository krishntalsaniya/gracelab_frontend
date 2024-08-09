import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form, Tabs, Tab } from "react-bootstrap";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import placeholderimage from "../img/ige-placeholder.jpg";
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
  { id: 8, name: "Blood Ige Test in vadodara" },
    { id: 9, name: "PCOD Profile Blood Test" }

];

function Igetest() {
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
const selectedTestId = "8";
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
          heading="IGT Test"
          pagetitlelink="/"
          title1="Home"
          title2="IGT Test"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="about-area ptb-120">
          <Container>
          {blog
            .filter(item => item._id === selectedItemId)
            .map(item => (
              <Row key={item._id}>
                <Col lg={6} className="mb-4">
                  <div className="test-details">
                    <img
                      src={`${process.env.REACT_APP_API_URL_GRACELAB}/${item.Images}`}
                      alt={item.Title}
                      onError={(e) => { e.target.src = placeholderimage }}
                      style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                    />
                  </div>
                </Col>
                <Col lg={6} className="mb-4">
                  <div className="title-test-dsc">
                    <h2>{item.Title}</h2>
                    <h4>Test Name: {item.TestName}</h4>
                    <h4 style={{ fontWeight: "bolder" }}>Price: {item.Price}</h4>

                    <div className="btn-box blood-test mt-3">
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
                  </div>
                </Col>
                <Col lg={12} className="mb-4">
                  <Tabs defaultActiveKey="description" id="test-tabs" className="mt-3">
                    <Tab eventKey="description" title="Description">
                      <div dangerouslySetInnerHTML={{ __html: item.Description }} />
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            ))}
        </Container>
      </section>

     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header">
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

export default Igetest;
