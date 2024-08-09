import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Pagetitle from "../patients/Pagetitle";
import { MdArrowForwardIos } from "react-icons/md";
import placeholderimage from "../img/award-placeholder.png";

function Awards() {
  const [blog, setBlog] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const fetchCMSContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Awards`
        );
        console.log("Awards and certificate:", response.data);

        if (Array.isArray(response.data)) {
          setBlog(response.data);
          preloadImages(response.data); // Preload images when data is received
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

  // Preload images and update loading percentage
  const preloadImages = (data) => {
    const imageUrls = data.map(
      (item) => encodeURI(`${process.env.REACT_APP_API_URL_GRACELAB}/${item.bannerImage}`)
    );
    const totalImages = imageUrls.length;
    let loaded = 0;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded += 1;
        setLoadingPercentage(Math.round((loaded / totalImages) * 100));
        if (loaded === totalImages) {
          setLoadedImages(imageUrls);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        loaded += 1;
        setLoadingPercentage(Math.round((loaded / totalImages) * 100));
        if (loaded === totalImages) {
          setLoadedImages(imageUrls);
        }
      };
    });
  };

  const openLightbox = (index) => {
    if (loadedImages.length > 0) {
      setPhotoIndex(index);
      setIsOpen(true);
    }
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const imageLoaded = (imageSrc, srcType, image) => {

  }

  useEffect(() => {
    if (isOpen && loadedImages.length > 0) {
      const mainSrc = loadedImages[photoIndex];
      console.log("Main Src:", mainSrc);
    }
  }, [photoIndex, isOpen, loadedImages]);

  return (
    <>
      <Modalnavigationbar />

        <div className="page-title-area">
        <Pagetitle
          heading="Awards and certificate"
          pagetitlelink="/"
          title1="Home"
          title2="Awards and certificate"
          IconComponent={MdArrowForwardIos}
        />
      </div>
    
      <div>
        <section className="shop-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="woocommerce-topbar">
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-md-7">
                      <div className="woocommerce-result-count"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {blog.map((item, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-6"
                      key={item._id} // Ensure unique key here
                      onClick={() => openLightbox(index)}
                    >
                      <div className="single-product-box">
                        <div className="product-image">
                          <Link to="#">
                            <img
                              src={encodeURI(`${process.env.REACT_APP_API_URL_GRACELAB}/${item.bannerImage}`)}
                              alt={item.Title}
                              onError={(e) => { e.target.src = placeholderimage }}
                              className="img-fluid"
                              style={{ maxWidth: '100%', height: 'auto' }} // Ensure proper styling
                            />
                          </Link>
                          <div className="product-content">
                            <h3>{item.Title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Loading Indicator */}
      {loadingPercentage < 100 && (
        <div className="loading-indicator">
          <p>Loading images... {loadingPercentage}%</p>
        </div>
      )}

      {/* Lightbox Component */}
      {isOpen && loadedImages.length > 0 && (
        <Lightbox
          mainSrc={loadedImages[photoIndex]}
          nextSrc={loadedImages[(photoIndex + 1) % loadedImages.length]}
          prevSrc={loadedImages[(photoIndex + loadedImages.length - 1) % loadedImages.length]}
          onImageLoad={imageLoaded}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + loadedImages.length - 1) % loadedImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % loadedImages.length)
          }
        />
      )}
    </>
  );
}

export default Awards;
