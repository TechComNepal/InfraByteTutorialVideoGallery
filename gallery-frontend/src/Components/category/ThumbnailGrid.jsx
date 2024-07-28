import React, { useEffect, useState } from "react";
import PlayButtonOverlay from "./PlayButtonOverlay";
import {
  Accordion,
  Button,
  Container,
  Modal,
  ToastContainer,
} from "react-bootstrap";
import noThumbnail from "../../Assets/images/no_thumbnail.jpg";

import "../../Assets/Css/ThumbnailGrid.css";

const ThumbnailGrid = ({
  selectedItem,
  yourVideosData,
  handleShow,
  showUpdate,
  videoType,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const playVideo = (url) => {
    setVideoUrl(url);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="video-player">
        <video controls autoPlay key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={`thumbnail-grid ${isMobile ? "mobile-list" : ""}`}>
        {isMobile && (
          <center>
            <Container
              onClick={handleShow}
              style={{
                backgroundColor: "gray",
                padding: "10px",
                color: "white",
              }}
            >
              <i className="fas fa-eye"></i> Show Video List
            </Container>
          </center>
        )}
        {!selectedItem && (
          <p>Welcome to InfraByte {videoType} video tutorial. </p>
        )}
        {selectedItem && (
          <>
            {yourVideosData && (
              <>
                <h3 className="mt-5 mb-3">{selectedItem.subCategory}</h3>
                <h6 className="mt-5 mb-3">{selectedItem.description}</h6>
                <center>
                  <div className="thumbnails">
                    {selectedItem.videoTutorials.map((thumbnail, index) => (
                      <div className="thumbnail-container" key={index}>
                        <div key={index} className="thumbnail-item">
                          {thumbnail.thumbnailName != null ? (
                            <img
                              src={thumbnail.thumbnailPath}
                              alt={thumbnail.fileName}
                              className="thumbnail-image "
                              onClick={() => playVideo(thumbnail.filePath)}
                            />
                          ) : (
                            // <img
                            //   src={noThumbnail}
                            //   alt="No image"
                            //   className="thumbnail-image "
                            //   onClick={() => playVideo(thumbnail.filePath)}
                            // />
                            <video
                              src={thumbnail.filePath}
                              className="thumbnail-image"
                              onClick={() => playVideo(thumbnail.filePath)}
                            ></video>
                          )}
                          <div className="thumbnail-overlay">
                            <a
                              href="/add/video"
                              variant="primary"
                              className="mt-3 btn  btn-danger"
                            >
                              Delete
                            </a>
                          </div>
                          <PlayButtonOverlay
                            onClick={() => playVideo(thumbnail.filePath)}
                          />
                        </div>
                        <h2 className="thumbnail-title">{thumbnail.title}</h2>
                      </div>
                    ))}
                  </div>
                </center>
              </>
            )}
            <h3 className="mt-5 mb-3">{selectedItem.category}</h3>
            <Accordion defaultActiveKey="default">
              <ToastContainer />
              {selectedItem.subCategories.map((category) => (
                <Accordion.Item
                  eventKey={category.videoTitle ?? ""}
                  key={category.videoTitle}
                >
                  <Accordion.Header
                    className={
                      selectedItem != null && selectedItem.category == category
                        ? "active"
                        : ""
                    }
                    id={category.videoTitle}
                  >
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <h6 className="mt-0 mb-1">{category.videoTitle}</h6>
                      {showUpdate && (
                        <a
                          href="/add/video"
                          variant="primary"
                          className="button-container mt-3  "
                        >
                          Update video
                        </a>
                      )}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <h6 className="mt-0 mb-3">{category.description}</h6>
                    <center>
                      <div className="thumbnails ">
                        {category.videoTutorials.map((thumbnail, index) => (
                          <div className="thumbnail-container" key={index}>
                            <div key={index} className="thumbnail-item">
                              {thumbnail.thumbnailName != null ? (
                                <img
                                  src={thumbnail.thumbnailPath}
                                  alt={thumbnail.fileName}
                                  className="thumbnail-image w-100"
                                  onClick={() => playVideo(thumbnail.filePath)}
                                />
                              ) : (
                                <img
                                  src={noThumbnail}
                                  alt="No image"
                                  className="thumbnail-image "
                                  onClick={() => playVideo(thumbnail.filePath)}
                                /> // <video src={thumbnail.filePath} className="thumbnail-image" onClick={() => playVideo(thumbnail.filePath)}></video>
                              )}

                              <PlayButtonOverlay
                                onClick={() => playVideo(thumbnail.filePath)}
                              />
                            </div>
                            <h2 className="thumbnail-title">
                              <span>
                                <i className="fa fa-video-camera"></i>
                              </span>
                              {"  "}
                              {thumbnail.subTitle}
                            </h2>
                          </div>
                        ))}
                      </div>
                    </center>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            {/* {!yourVideosData && (
              <>
                <h3 className="mt-5 mb-3">
                  {selectedItem.subCategories[0].subCategory}
                </h3>
                <h6 className="mt-5 mb-3">
                  {selectedItem.subCategories[0].description}
                </h6>
                <center>
                  <div className="thumbnails">
                    {selectedItem.subCategories[0].videoTutorials.map(
                      (thumbnail, index) => (
                        <div className="thumbnail-container" key={index}>
                          <div key={index} className="thumbnail-item">
                            {thumbnail.thumbnailName != null ? (
                              <img
                                src={thumbnail.thumbnailPath}
                                alt={thumbnail.fileName}
                                className="thumbnail-image"
                                onClick={() => playVideo(thumbnail.filePath)}
                              />
                            ) : (
                              <img
                                src={noThumbnail}
                                alt="No image"
                                className="thumbnail-image "
                                onClick={() => playVideo(thumbnail.filePath)}
                              /> // <video src={thumbnail.filePath} className="thumbnail-image" onClick={() => playVideo(thumbnail.filePath)}></video>
                            )}

                            <PlayButtonOverlay
                              onClick={() => playVideo(thumbnail.filePath)}
                            />
                          </div>
                          <h2 className="thumbnail-title">
                            <span>
                              <i className="fa fa-play-circle"></i>
                            </span>{" "}
                            {thumbnail.title}
                          </h2>
                        </div>
                      )
                    )}
                  </div>
                </center>
              </>
            )} */}
            {/* <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{selectedItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="video-player">
                <video controls autoPlay>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
          </>
        )}
      </div>
    </>
  );
};

export default ThumbnailGrid;
