import React, { useEffect, useState } from "react";
import PlayButtonOverlay from "./PlayButtonOverlay";
import { Button, Container, Modal } from "react-bootstrap";

import "../../Assets/Css/ThumbnailGrid.css";

const ThumbnailGrid = ({
  selectedItem,
  yourVideosData,
  handleShow,
  showUpdate,
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
        {!selectedItem && <p>Welcome to InfraByte video tutorial. </p>}
        {selectedItem && (
          <>
            {showUpdate && (
              <a
                href="/add/video"
                variant="primary"
                className="button-container mt-3  "
              >
                Update video
              </a>
            )}

            {yourVideosData && (
              <>
                {" "}
                <h3 className="mt-5 mb-3">{selectedItem.subCategory}</h3>
                <center>
                  <div className="thumbnails">
                    {selectedItem.videoTutorials.map((thumbnail, index) => (
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
                            <video src={thumbnail.filePath}></video>
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
            {!yourVideosData && (
              <>
                <h3 className="mt-5 mb-3">
                  {selectedItem.subCategories[0].subCategory}
                </h3>

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
                              <video src={thumbnail.filePath}></video>
                            )}

                            <PlayButtonOverlay
                              onClick={() => playVideo(thumbnail.filePath)}
                            />
                          </div>
                          <h2 className="thumbnail-title">{thumbnail.title}</h2>
                        </div>
                      )
                    )}
                  </div>
                </center>
              </>
            )}
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
