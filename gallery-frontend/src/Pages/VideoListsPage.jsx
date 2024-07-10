import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CategoryAccordion from "../Components/category/CategoryAccordion";
import { category } from "../data/category";
import ThumbnailGrid from "../Components/category/ThumbnailGrid";
import Header from "../Components/Header";
import RightSideModal from "../Components/RightSideModal";
import axios from "axios";
import { getAllJobTutorials } from "../config/config";
import { getHeaders } from "../services/auth";

const VideoListsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Container className="mt-5 mb-5" style={{ minHeight: "100vh" }}>
        <Row>
          <Col md={3} className="hide-container">
            <CategoryAccordion
              data={category}
              setSelectedItem={setSelectedItem}
              modalClose={handleClose}
            />
          </Col>

          <Col md={9}>
            <div className="output">
              <ThumbnailGrid
                selectedItem={selectedItem}
                handleShow={handleShow}
                showUpdate={false}
              />
            </div>
          </Col>
        </Row>

        <RightSideModal show={showModal} handleClose={handleClose}>
          <CategoryAccordion
            data={category}
            setSelectedItem={setSelectedItem}
            modalClose={handleClose}
          />
        </RightSideModal>
      </Container>
    </>
  );
};

export default VideoListsPage;
