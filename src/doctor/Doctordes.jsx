import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { IoMdTimer } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row, Button, Modal, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import ReactStars from 'react-rating-stars-component'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
   email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  contactNumber:  Yup.string()
    .matches(/^\d+$/, 'Contact No. must contain only digits')
    .length(10, 'Contact No. must be exactly 10 digits')
    .required('Contact No. is required'),
});


const validationSchemarating = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  
});

function Doctordes(props) {
  const [dayName, setDayName] = useState('');
  const [dayName2, setDayName2] = useState('');
  const [dayName3, setDayName3] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ratingshowModal, setratingShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  // Function to handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
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
  }, [props.dayslab1, props.dayslab2, props.dayslab3]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', values.name);
      formDataToSend.append('email', values.email);
      formDataToSend.append('contactNumber', values.contactNumber);
      formDataToSend.append('Description', values.description);
      formDataToSend.append('myFile', values.file); // Ensure 'myFile' matches your backend field name

      // Adjust the API endpoint to match your backend route for submitting contact form
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Contactdoctor/${props.Labid}`,
        formDataToSend
      );
      console.log('Form submitted successfully:', response.data);

      // Show SweetAlert popup upon successful submission
      Swal.fire({
        icon: 'success',
        title: 'Form Submitted!',
        text: 'Your form has been submitted successfully.',
        confirmButtonText: 'Ok',
      }).then(() => {
        setShowModal(false);
        resetForm();
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state or display error message to user
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonText: 'Ok',
      });
    }
  };

   const handleratingsubmit = async (values, { resetForm }) => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', values.name);
        formDataToSend.append('rating', rating); // Assuming values.rating is provided from the form
        formDataToSend.append('Doctor', props.Labid); // Assuming values.Doctor is provided from the form

     const response = await axios.post(
    `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/ContactRating`,
    {
        name: values.name,
        rating: rating,
        Doctor: props.Labid,
    }
);


        console.log('Form submitted successfully:', response.data);

        // Show SweetAlert popup upon successful submission
        Swal.fire({
            icon: 'success',
            title: 'Form Submitted!',
            text: 'Your rating has been submitted successfully.',
            confirmButtonText: 'Ok',
        }).then(() => {
            resetForm();
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error state or display error message to user
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again.',
            confirmButtonText: 'Ok',
        });
    }
};

  return (
    <>
      <Card className="single-research-box">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="research-image">
              <Link to={props.imagelink} target="_blank">
                <Image src={props.hospitalimage} alt="image" />
              </Link>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Card.Body className="research-content">
              <h3>
                <Link to="#">{props.mainheading}</Link>
              </h3>
              <div className="location-marker-section">
                <Link to={props.locationmap} target="_blank">
                  <h5 className="mt-3 d-inline-block me-2">
                    <FaMapMarker className="map-color" /> {props.headings}
                  </h5>
                </Link>
              </div>
              <div className="location-marker-section">
                <h5 className="mt-3 d-inline-block me-2">
                  <IoMdTimer className="map-color" /> {props.starttime1} - {props.endtime1} - {dayName}
                  <br /> <br />
                  <IoMdTimer className="map-color" /> {props.starttime2} - {props.endtime2} - {dayName2}
                  <br /> <br />
                  <IoMdTimer className="map-color" /> {props.starttime3} - {props.endtime3} - {dayName3}
                </h5>
              </div>
              <Button
                variant="primary"
                className="rounded-pill mt-3 float-end"
                style={{ borderRadius: '10px' }}
                onClick={() => setShowModal(true)}
              >
                Contact
              </Button>

              <Button
              
                className="mt-3 float-end"
                style={{ borderRadius: '10px' }}
                onClick={() => setratingShowModal(true)}
              >
                rating
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Contact Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact {props.mainheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              contactNumber: '',
              description: '',
              file: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <FormikForm>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Field
                    name="contactNumber"
                    type="text"
                    placeholder="Enter your contact number"
                    className="form-control"
                  />
                  <ErrorMessage name="contactNumber" component="div" className="text-danger" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Upload File</Form.Label>
                  <input
                    name="file"
                    type="file"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Field
                    name="description"
                    type="text"
                    placeholder="Enter your Description"
                    className="form-control"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>


      <Modal show={ratingshowModal} onHide={() => setratingShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating {props.mainheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={validationSchemarating}
            onSubmit={handleratingsubmit}
          >
           
              <FormikForm>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Describe</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Rating </Form.Label>
                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ReactStars
      name="star"
        count={5}  // Number of stars to display
        size={48}  // Size of the stars in pixels
        activeColor="#ffd700"  // Color of active stars
        onChange={handleRatingChange}  // Callback when rating changes
         value={rating}  // Controlled value of the rating
      />
    </div>
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </Form.Group>
              
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </FormikForm>
           
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Doctordes;















// import React, { useState, useEffect } from 'react';
// import { FaMapMarker } from 'react-icons/fa';
// import { IoMdTimer } from 'react-icons/io';
// import { Link } from 'react-router-dom';
// import { Card, Col, Image, Row, Button, Modal, Form } from 'react-bootstrap';
// import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import StarRatings from 'react-star-ratings'; // Import star rating component

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string()
//     .matches(
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//       'Invalid email address'
//     )
//     .required('Email is required'),
//   contactNumber: Yup.string()
//     .matches(/^\d+$/, 'Contact No. must contain only digits')
//     .length(10, 'Contact No. must be exactly 10 digits')
//     .required('Contact No. is required'),
// });

// function Doctordes(props) {
//   const [dayName, setDayName] = useState('');
//   const [dayName2, setDayName2] = useState('');
//   const [dayName3, setDayName3] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [rating, setRating] = useState(0); // State to hold rating value

//   useEffect(() => {
//     const fetchDayName = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab1}`
//         );
//         setDayName(response.data.Days);
//       } catch (error) {
//         console.error('Error fetching day name:', error);
//       }
//     };

//     fetchDayName();
//      const fetchDayName2 = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab2}`);
//         setDayName2(response.data.Days);
//       } catch (error) {
//         console.error('Error fetching day name:', error);
//       }
//     };

//     fetchDayName2();

//     const fetchDayName3 = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/Days/${props.dayslab3}`);
//         setDayName3(response.data.Days);
//       } catch (error) {
//         console.error('Error fetching day name:', error);
//       }
//     };

//     fetchDayName3();

//     // Add similar fetch functions for dayName2 and dayName3 here
//   }, [props.dayslab1, props.dayslab2, props.dayslab3]);

//      const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, file: e.target.files[0] });
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', values.name);
//       formDataToSend.append('email', values.email);
//       formDataToSend.append('contactNumber', values.contactNumber);
//       formDataToSend.append('Description', values.description);
//       formDataToSend.append('myFile', values.file); // Ensure 'myFile' matches your backend field name

//       // Adjust the API endpoint to match your backend route for submitting contact form
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/Contactdoctor/${props.Labid}`,
//         formDataToSend
//       );
//       console.log('Form submitted successfully:', response.data);

//       // Show SweetAlert popup upon successful submission
//       Swal.fire({
//         icon: 'success',
//         title: 'Form Submitted!',
//         text: 'Your form has been submitted successfully.',
//         confirmButtonText: 'Ok',
//       }).then(() => {
//         setShowModal(false);
//         resetForm();
//       });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       // Handle error state or display error message to user
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong! Please try again.',
//         confirmButtonText: 'Ok',
//       });
//     }
//   };

//    const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contactNumber: '',
//     file: null,
//   });

//   const handleRatingSubmit = async () => {
//     try {
//       // Adjust the API endpoint and data structure as per your backend requirements
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/rate/Doctor/${props.Labid}`,
//         { rating }
//       );
//       console.log('Rating submitted successfully:', response.data);

//       // Show SweetAlert popup upon successful submission
//       Swal.fire({
//         icon: 'success',
//         title: 'Rating Submitted!',
//         text: 'Your rating has been submitted successfully.',
//         confirmButtonText: 'Ok',
//       }).then(() => {
//         setShowRatingModal(false);
//         setRating(0); // Reset rating state after submission
//       });
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//       // Handle error state or display error message to user
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong! Please try again.',
//         confirmButtonText: 'Ok',
//       });
//     }
//   };

 

//   return (
//     <>
//       <Card className="single-research-box">
//         <Row>
//           <Col lg={6} md={6} sm={12}>
//             <div className="research-image">
//               <Link to={props.imagelink} target="_blank">
//                 <Image src={props.hospitalimage} alt="image" />
//               </Link>
//             </div>
//           </Col>
//           <Col lg={6} md={6} sm={12}>
//             <Card.Body className="research-content">
//               <h3>
//                 <Link to="#">{props.mainheading}</Link>
//               </h3>
//               <div className="location-marker-section">
//                 <Link to={props.locationmap} target="_blank">
//                   <h5 className="mt-3 d-inline-block me-2">
//                     <FaMapMarker className="map-color" /> {props.headings}
//                   </h5>
//                 </Link>
//               </div>
//               <div className="location-marker-section">
//                 <h5 className="mt-3 d-inline-block me-2">
//                   <IoMdTimer className="map-color" /> {props.starttime1} - {props.endtime1} - {dayName}
//                   <br /> <br />
//                   <IoMdTimer className="map-color" /> {props.starttime2} - {props.endtime2} - {dayName2}
//                   <br /> <br />
//                   <IoMdTimer className="map-color" /> {props.starttime3} - {props.endtime3} - {dayName3}
//                 </h5>
//               </div>
//               <Button
//                 variant="primary"
//                 className="rounded-pill mt-3 me-2"
//                 style={{ borderRadius: '10px' }}
//                 onClick={() => setShowModal(true)}
//               >
//                 Contact
//               </Button>
//               <Button
//                 variant="secondary"
//                 className="rounded-pill mt-3"
//                 style={{ borderRadius: '10px' }}
//                 onClick={() => {
//                   setShowRatingModal(true);
//                 }}
//               >
//                 Rate
//               </Button>
//             </Card.Body>
//           </Col>
//         </Row>
//       </Card>

//       {/* Contact Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Contact {props.mainheading}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formContactNumber">
//               <Form.Label>Contact Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your contact number"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formFile">
//               <Form.Label>Upload File</Form.Label>
//               <Form.Control type="file" name="myFile" onChange={handleFileChange} />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Rating Modal */}
//       <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Rate {props.mainheading}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Rating</Form.Label>
//             <StarRatings
//               rating={rating}
//               starRatedColor="orange"
//               changeRating={(newRating) => setRating(newRating)}
//               numberOfStars={5}
//               name="rating"
//             />
//           </Form.Group>
//           <Button variant="primary" onClick={handleRatingSubmit}>
//             Submit Rating
//           </Button>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Doctordes;

