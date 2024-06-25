import React, { useState } from "react";
import "../../Assets/Css/ThumbnailGrid.css";
import PlayButtonOverlay from "./PlayButtonOverlay";
import { Button, Modal } from "react-bootstrap";

const ThumbnailGrid = ({ selectedItem }) => {

  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const playVideo = (url) => {
    setVideoUrl(url);
    setShowModal(true);
  };

  const handleClose = () => {
    setVideoUrl('');
    setShowModal(false);
  };
  
  return (
    <div className="thumbnail-grid">
      {selectedItem && (
        <>
          <h3>{selectedItem.title}</h3>
          <div className="thumbnails">
            {selectedItem.thumbnails.map((thumbnail, index) => (
              <div key={index} className="thumbnail-item">
                <img
                  src={thumbnail.url}
                  alt={thumbnail.title}
                  className="thumbnail-image"  onClick={() => playVideo(thumbnail.videoUrl)}
                />
                <PlayButtonOverlay onClick={() => playVideo(thumbnail.videoUrl)}/>
                <div className="thumbnail-overlay">
                  <span className="thumbnail-title">{thumbnail.title}</span>
                </div>
              </div>
            ))}
          </div><Modal show={showModal} onHide={handleClose} size="lg">
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
          </Modal>
        </>
      )}
    </div>
  );
};

export default ThumbnailGrid;
