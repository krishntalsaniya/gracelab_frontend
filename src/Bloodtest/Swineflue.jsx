import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Modal, Button, Form, Accordion } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import Modalnavigationbar from "../navbar/Modalnavigationbar";

function Swineflue() {
  const [showModal, setShowModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // State to store selected item ID

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

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
      // Fetch details of the selected item
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/getTestDetailById/${selectedItemId}`
      );
      console.log("Fetched details for selected item:", response.data);

      // Show success toast
      toast.success("Inquiry was successfully received!");

      setShowModal(false); // Close the modal after handling data
    } catch (error) {
      console.error("Error fetching item details:", error);
      // Show error toast
      toast.error("There was an error submitting your inquiry.");
    }
  };

  useEffect(() => {
    const fetchCMSContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/getallTestDetails`
        );
        console.log("set all images and list:", response.data);

        if (Array.isArray(response.data)) {
          setBlog(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setBlog([]);
        }
      } catch (error) {
        console.error("Error fetching CMS content:", error);
        setBlog([]);
      }
    };

    fetchCMSContent();
  }, []);

  return (
    <>
      <Modalnavigationbar />

      <section className="about-area ptb-40">
        <Container>
          {blog.map((item) => (
            <Row className="align-items-center" key={item._id}>
              <Col lg={6} md={12}>
                <div className="about-image test-images">
                  <Image src={`${process.env.REACT_APP_API_URL_GRACELAB}/${item.Images}`} alt="image" />
                </div>
              </Col>
              <Col lg={6} md={12}>
                <div className="about-content">
                  <h2>{item.Title}</h2>
                  <h5>Test Name: {item.TestName}</h5>
                  <h5>Price: {item.Price}</h5>

                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Description</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: item.Description }} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <div className="btn-box">
                    <Button
                      variant="primary"
                      className="btn-login"
                      onClick={() => {
                        setSelectedItemId(item._id); // Set the selected item ID
                        setShowModal(true);
                      }}
                    >
                      Inquiry
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </section>

      {/* Modal Component */}
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

      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </>
  );
}

export default Swineflue;
