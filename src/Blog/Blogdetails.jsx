import React, { useEffect, useState } from 'react';
import Modalnavigationbar from '../navbar/Modalnavigationbar';
import { MdArrowForwardIos } from "react-icons/md";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Blogdetails() {
  const { id } = useParams();
  console.log("chjhc",id)
  const [bout, setBout] = useState({ blogDesc: "", blogTitle: "" }); // Initialize with a default structure

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/get/AboutUs/${id}`
        );
     
        setBout(res.data);
        console.log("blog details asas",res);
        
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAbout();
  }, [id]); // Ensure _ID is included as a dependency

  return (
    <>
      <Modalnavigationbar />



<div>
  <div className="page-title-area">
    <div className="container">
      <div className="page-title-content">
        <h2>{bout.Title || 'Loading...'}</h2>
        <ul>
          <li>
            <MdArrowForwardIos className='arrowright' />
            <Link to='/'>Home</Link>
          </li>
          <li>{bout.Title || 'Loading...'}</li>
        </ul>
      </div>
    </div>
  </div>
  {/* End Page Title Area */}
  {/* Start Blog Details Area */}
  <section className="blog-details-area ptb-120">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-12">
          <div className="blog-details">
            <div className="article-image">
              <div dangerouslySetInnerHTML={{ __html: bout.Description }} />
            </div>
            <div className="article-content">
              <div className="entry-meta">
                <ul>
                  <li>
                    <i className="far fa-user-circle" />
                    By: <a href="single-blog.html">Admin</a>
                  </li>
                  <li>7 Aug 2024</li>
                  <li><a href="single-blog.html">Tech</a></li>
                  <li>2 Mins Read</li>
                  <li>521 Views</li>
                  <li><a href="single-blog.html">3 Comments</a></li>
                </ul>
              </div>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
              <blockquote className="wp-block-quote">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <cite>Tom Cruise</cite>
              </blockquote>
              <p>Equidem impedit officiis quo te...</p>
              <ul className="wp-block-gallery">
                {/* <li className="blocks-gallery-item">
                  <figure>
                    <img src="assets/img/blog-img8.jpg" alt="image" />
                  </figure>
                </li>
                <li className="blocks-gallery-item">
                  <figure>
                    <img src="assets/img/blog-img7.jpg" alt="image" />
                  </figure>
                </li>
                <li className="blocks-gallery-item">
                  <figure>
                    <img src="assets/img/blog-img6.jpg" alt="image" />
                  </figure>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End Blog Details Area */}
</div>

    </>
  );
}

export default Blogdetails;
