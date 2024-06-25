import React, { useState } from "react";
import "../../Assets/Css/ThumbnailGrid.css";
import PlayButtonOverlay from "./PlayButtonOverlay";
import { Button, Modal } from "react-bootstrap";

const ThumbnailGrid = ({ selectedItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [prevVideoUrl, setPrevVideoUrl] = useState("");

  const playVideo = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className="thumbnail-grid">
      {
        <div className="video-player">
          <video controls autoPlay key={videoUrl}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      }
      {selectedItem && (
        <>
          <h3 className="mt-5 mb-3">{selectedItem.title}</h3>
          <center>
            <div className="thumbnails">
              {selectedItem.thumbnails.map((thumbnail, index) => (
                <div key={index} className="thumbnail-item">
                  <img
                    src={thumbnail.url}
                    alt={thumbnail.title}
                    className="thumbnail-image"
                    onClick={() => playVideo(thumbnail.videoUrl)}
                  />
                  <PlayButtonOverlay
                    onClick={() => playVideo(thumbnail.videoUrl)}
                  />
                  <div className="thumbnail-overlay">
                    <span className="thumbnail-title">{thumbnail.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </center>
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
  );
};

export default ThumbnailGrid;
