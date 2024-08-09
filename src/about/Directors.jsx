import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdArrowForwardIos } from "react-icons/md";
import Modalnavigationbar from "../navbar/Modalnavigationbar";
import axios from "axios";
import Pagetitle from "../patients/Pagetitle";
import placeholderimage from "../img/placeholder.jpeg";
import "../css/responsive.css";
import "../css/style.css";

function Directors() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const CMScontent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_GRACELAB}/api/auth/list/Director`
        );
        console.log("Director list:", response.data);

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

    CMScontent();
  }, []);

  return (
    <>
      <Modalnavigationbar />
      <div className="page-title-area">
        <Pagetitle
          heading="Directors"
          pagetitlelink="/"
          title1="Home"
          title2="Directors"
          IconComponent={MdArrowForwardIos}
        />
      </div>

      <section className="team-details-area ptb-120">
        <div className="container">
          <div className="row">
            {blog.map((item, index) => (
              <React.Fragment key={item.id}>
                {index % 2 === 0 ? (
                  <>
                    <div className="col-lg-4 col-md-12">
                      <div className="director-details-sidebar">
                        <div className="team-profile">
                          <img
                            src={
                              item.bannerImage
                                ? `${process.env.REACT_APP_API_URL_GRACELAB}/${item.bannerImage}`
                                : placeholderimage
                            }
                            alt={item.Tittle}
                          />
                          <div className="team-content">
                            <h3>{item.Tittle}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-12">
                      <div className="team-details-desc">
                        <h3>About Me</h3>
                        <p>{item.Description}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-lg-8 col-md-12">
                      <div className="team-details-desc">
                        <h3>About Me</h3>
                        <p>{item.Description}</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="director-details-sidebar">
                        <div className="team-profile">
                          <img
                            src={
                              item.bannerImage
                                ? `${process.env.REACT_APP_API_URL_GRACELAB}/${item.bannerImage}`
                                : placeholderimage
                            }
                            alt={item.Tittle}
                          />
                          <div className="team-content">
                            <h3>{item.Tittle}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Directors;
