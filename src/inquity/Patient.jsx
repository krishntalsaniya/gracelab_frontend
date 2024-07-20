import React, { useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import logo from "../img/logo.jpg";
import axios from "axios";
import bg1 from "../img/logo.jpg";
import bg2 from "../img/logo.jpg";
import { Col, Label, Row } from "reactstrap";
import ThankYouModal from "./ThankYouModal";
import { useParams } from "react-router-dom";


function Patinent() {
    // const { id } = useParams();
    // console.log("object",id)
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showOtherMedical, setShowOtherMedical] = useState(false);

  const [submittedValues, setSubmittedValues] = useState({});
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [Venues, setVenue] = useState([]);
  const [mydata,setMyData]= useState("");
  const [myPaydata,setMyPayData]= useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/MedicalCondition`).then((res)=>{
     setMedicalConditions(res.data);
     console.log("newww",res.data)
     }
    );
     axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Society`).then((res)=>{
     setVenue(res.data);
     console.log("newww",res.data)
     }
    )
   }, []);

   const fetchData=async(mydata2)=>{
    axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/getbyid/Society/${mydata2}`).then((res)=>{
      
          console.log("mydata",res.data)
          setMyPayData(res.data)
          }
         );
   }
  //  useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/getbyid/Society/${id}`).then((res)=>{
      
  //     console.log("mydata",res.data)
  //     setMyData(res.data)
  //     }
  //    );
  //  },[id])

console.log(mydata)
  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    Phone: "",
    Gender: "",
    DOB: "",
    CampDate: "",
    Venue: "",
    Address: "",
    DocRef: "",
    Medical: "",
    Remark: "",
    Receivedid: Date.now(),
    ReceivedImage: "",
    IsActive: true,
    // Society:id,
        OtherMedicalCondition:""
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    Phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    Gender: Yup.string().required("Gender is required"),
    DOB: Yup.date().required("Date of Birth is required"),
    CampDate: Yup.date().required("Camp Date is required"),
    Address: Yup.string().required("Your Address is required"),
    Venue: Yup.string().required("Camp Venue is required"),
    DocRef: Yup.string().required("Reference is required"),
    Medical: Yup.string().required("Medical condition is required"),
    // OtherMedicalCondition: Yup.string().required("Medical condition is required"),
    
  });

  const handleRegister = async (values) => {
    try {
      setSubmittedValues(values);
      setShowThankYouModal(true);
    } catch (error) {
      console.error("Some error:", error);
      alert("Request failed. Please try again.");
    }
  };


  const handleFreeRegister = async (values) => {
    try {
      // console.log(values.ReceivedImage);
      const formdata = new FormData();
      formdata.append("IsActive", values.IsActive);
      formdata.append("Remark",values. Remark);
      formdata.append("ReceivedImage", "");
      formdata.append("Medical", values.Medical);
      formdata.append("OtherMedicalCondition", values.OtherMedicalCondition);
      formdata.append("DocRef", values.DocRef);
      formdata.append("Address", values.Address);  
      formdata.append("DOB",values.DOB);
      formdata.append("Venue",values.Venue);
      formdata.append("CampDate",values.CampDate);
      formdata.append("Society",values.Society);
      formdata.append("Gender", values.Gender);
      formdata.append("Phone", values.Phone);
      formdata.append("email", values.email);
      formdata.append("middleName",values.middleName);
      formdata.append("firstName",values.firstName);
      formdata.append("lastName",values.lastName);
      // formdata.append("Receivedid",`P${Date.now()}`);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/create/PatientInquiryWithSociety`,
        formdata
      );
      console.log(response);
      if(response.data.isOk)
        {
          // handleClose();
          alert("Inquiry Successful");
           
        }

    } catch (error) {
      console.error("Some error:", error);
      alert("Request failed. Please try again.");
    }
  };
  return (
    <div>
      <section className="container mb-5">
        <div className="auto-container">
          <div className="content-box p_relative d_block b_shadow_6 b_radius_5 pt_60 pr_50 pb_70 pl_50">
            <div className="shape">
              <div
                style={{ background: "#f7f7f7" }}
                className="shape-1 p_absolute w_170 h_170 b_radius_50 "
              />
              <div
                style={{ background: "#f7f7f7" }}
                className="shape-2 b_140 p_absolute w_170 h_170 b_radius_50 "
              />
              <div
                className="shape-3 p_absolute t_45 float-bob-y"
                style={{ backgroundImage: `url(${bg1})` }}
              />
              <div
                className="shape-4 p_absolute w_95 h_95 b_50 float-bob-y"
                style={{ backgroundImage: `url(${bg2})` }}
              />
            </div>
            <div
              style={{
                height: "130px",
                margin: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image src={logo} className="h-100" style={{minWidth:200}} fluid />
            </div>
            <div className="text p_relative d_block mb_25 mb-3">
              <h3
                className="d_block fs_30 lh_40 fw_bold mb_5"
                style={{ textAlign: "center" }}
              >
                Registration Form For Patient
              </h3>
            </div>
            <div className="form-inner">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setShowOtherMedical(false);
                  setMyData("")
                  console.log("clg",values.Medical)
                  if(myPaydata.pay===true)
                    {
                      handleRegister(values);
                      setSubmitting(false);
                    }
                    else{
                      handleFreeRegister(values);
                    }
                  
                  resetForm();
                }}
              >
                {({
                  isSubmitting,
                  errors,
                  touched,
                  setFieldValue,
                  values,
                  resetForm,
                }) => (
                  <>
                    <Form>
                      <Row>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.firstName && touched.firstName
                                ? "has-danger"
                                : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label htmlFor="firstName" className="form-Label">
                                First Name:
                              </Label>
                            </div>
                            <Field
                              type="text"
                              className={`form-control form-control-lg ${
                                errors.firstName && touched.firstName
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="firstName"
                              name="firstName"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.middleName && touched.middleName
                                ? "has-danger"
                                : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label htmlFor="middleName" className="form-Label">
                                Middle Name:
                              </Label>
                            </div>
                            <Field
                              type="text"
                              className={`form-control form-control-lg ${
                                errors.middleName && touched.middleName
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="middleName"
                              name="middleName"
                            />
                            <ErrorMessage
                              name="middleName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.lastName && touched.lastName
                                ? "has-danger"
                                : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label htmlFor="lastName" className="form-Label">
                                Last Name:
                              </Label>
                            </div>
                            <Field
                              type="text"
                              className={`form-control form-control-lg ${
                                errors.lastName && touched.lastName
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="lastName"
                              name="lastName"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.email && touched.email ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Email:</Label>
                            </div>
                            <Field
                              type="email"
                              className={`form-control form-control-lg ${
                                errors.email && touched.email ? "is-invalid" : ""
                              }`}
                              id="email"
                              name="email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.Phone && touched.Phone ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Phone No:</Label>
                            </div>
                            <Field
                              type="number"
                              className={`form-control form-control-lg ${
                                errors.Phone && touched.Phone ? "is-invalid" : ""
                              }`}
                              id="Phone"
                              name="Phone"
                            />
                            <ErrorMessage
                              name="Phone"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.Gender && touched.Gender ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Gender:</Label>
                            </div>
                            <Field
                              component="select"
                              className={`form-select ${
                                errors.Gender && touched.Gender ? "is-invalid" : ""
                              }`}
                              id="Gender"
                              name="Gender"
                            >
                              <option value="" label="Select gender" />
                              <option value="male" label="Male" />
                              <option value="female" label="Female" />
                            </Field>
                            <ErrorMessage
                              name="Gender"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.DOB && touched.DOB ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Date of Birth:</Label>
                            </div>
                            <Field
                              type="date"
                              className={`form-control form-control-lg ${
                                errors.DOB && touched.DOB ? "is-invalid" : ""
                              }`}
                              id="DOB"
                              name="DOB"
                            />
                            <ErrorMessage
                              name="DOB"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col><Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.CampDate && touched.CampDate ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Camp Date:</Label>
                            </div>
                            <Field
                              type="date"
                              className={`form-control form-control-lg ${
                                errors.CampDate && touched.CampDate ? "is-invalid" : ""
                              }`}
                              id="CampDate"
                              name="CampDate"
                            />
                            <ErrorMessage
                              name="CampDate"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.Venue && touched.Venue ? "has-danger" : ""
                            }`}
                          >
                             <div className="col-4">
                              <Label>Camp Venue:</Label>
                            </div>
                            <Field
                              as="select"
                              className={`form-select ${
                                errors.Venue && touched.Venue ? "is-invalid" : ""
                              }`}
                              id="Venue"
                              name="Venue"
                              onChange={(event) => {
                                const value = event.target.value;
                                setMyData(event.target.value);
                                setFieldValue('Venue',value)
                                fetchData(event.target.value)
                              }}
                            >
                              <option value="">Choose...</option>
                             {Venues && Venues
    .filter(item => item.IsActive)
    .map((item, index) => (
        <option key={item._id} value={item._id}>
            {item.Society}
        </option>
    ))
}
</Field>
                            <ErrorMessage
                              name="Venue"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.Address && touched.Address ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Your Address:</Label>
                            </div>
                            <Field
                              type="text"
                              className={`form-control form-control-lg ${
                                errors.Address && touched.Address ? "is-invalid" : ""
                              }`}
                              id="Address"
                              name="Address"
                            />
                            <ErrorMessage
                              name="Address"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.DocRef && touched.DocRef ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Reference:</Label>
                            </div>
                            <Field
                              type="text"
                              className={`form-control form-control-lg ${
                                errors.DocRef && touched.DocRef ? "is-invalid" : ""
                              }`}
                              id="DocRef"
                              name="DocRef"
                            />
                            <ErrorMessage
                              name="DocRef"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        {!showOtherMedical ? (
        <Col lg={6} md={6}>
          <div
            className={`form-outline mb-4 ${
              errors.Medical && touched.Medical ? "has-danger" : ""
            }`}
          >
            <div className="col-4">
              <Label>Medical Condition:</Label>
            </div>
            <Field
              as="select"
              className={`form-select ${
                errors.Medical && touched.Medical ? "is-invalid" : ""
              }`}
              id="Medical"
              name="Medical"
              onChange={(event) => {
                const value = event.target.value;
                setFieldValue("Medical", value);
                if (value === "6661a1d061fd5a0faa7de829") {
                  setShowOtherMedical(true);
                } else {
                  setShowOtherMedical(false);
                }
              }}
            >
              <option value="">Choose...</option>
              {medicalConditions &&
                medicalConditions
                  .filter((item) => item.IsActive)
                  .map((item, index) => (
                    <option key={item._id} value={item._id}>
                      {item.MedicalCondition}
                    </option>
                  ))}
            </Field>
            <ErrorMessage
              name="Medical"
              component="div"
              className="invalid-feedback"
            />
          </div>
        </Col>
      ) : (
        <Col lg={6} md={6}>
          <div className="form-outline mb-4">
            <div className="col-4">
              <Label>Other Medical Condition:</Label>
            </div>
            <Field
              type="text"
              className="form-select"
              id="OtherMedicalCondition"
              name="OtherMedicalCondition"
            />
          
          </div>
        </Col>
      )}
                        <Col lg={6} md={6}>
                          <div
                            className={`form-outline mb-4 ${
                              errors.Remark && touched.Remark ? "has-danger" : ""
                            }`}
                          >
                            <div className="col-4">
                              <Label>Remark:</Label>
                            </div>
                            <Field
                              type="text"
                              className="form-control form-control-lg"
                              id="Remark"
                              name="Remark"
                            />
                          
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="form-outline  mt-4">
                            <Button
                              type="submit"
                              className="btn btn-success"
                              disabled={isSubmitting}
                            >
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                    <ThankYouModal
                      show={showThankYouModal}
                      IsActive={submittedValues.IsActive}
                      Receivedid={submittedValues.Receivedid}
                      Remark={submittedValues.Remark}
                      Medical={submittedValues.Medical}
                      OtherMedicalCondition={submittedValues.OtherMedicalCondition}
                      DocRef={submittedValues.DocRef}
                      Address={submittedValues.Address}
                      DOB={submittedValues.DOB}
                      Gender={submittedValues.Gender}
                      Phone={submittedValues.Phone}
                      email={submittedValues.email}
                      middleName={submittedValues.middleName}
                      lastName={submittedValues.lastName}
                      firstName={submittedValues.firstName}
                      Venue={submittedValues.Venue}
                      CampDate={submittedValues.CampDate}
                      Society={submittedValues.Society}
                      ReceivedImage=""
                      handleClose={() => {
                        setShowThankYouModal(false);
                        resetForm();
                      }}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    
                    />
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Patinent;
