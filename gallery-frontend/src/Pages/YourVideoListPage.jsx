import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CategoryAccordion from "../Components/category/CategoryAccordion";
import { category } from "../data/category";
import ThumbnailGrid from "../Components/category/ThumbnailGrid";
import Header from "../Components/Header";
import RightSideModal from "../Components/RightSideModal";
import { getHeaders } from "../services/auth";
import axios from "axios";
import { getAllJobTutorials } from "../config/config";

const YourVideoListsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =  () => {
     axios
      .get(getAllJobTutorials, {
        headers: getHeaders(),
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <>
      <Container className="mt-5 mb-5" style={{ minHeight: "100vh" }}>
        <a
          href="/add/video"
          variant="primary"
          className="button-container mt-3  "
        >
          Upload video
        </a>
        <h1 className="heading3 mb-3 mt-5">Your videos</h1>
        <Row>
          <Col md={3} className="hide-container">
            {/* hides if mobile */}
            <CategoryAccordion
              yourVideosData={data}
              setSelectedItem={setSelectedItem}
              modalClose={handleClose}
            />
          </Col>
          <Col md={9}>
            <div className="output">
              <ThumbnailGrid
                selectedItem={selectedItem}
                yourVideosData={data}
                handleShow={handleShow}
                showUpdate={true}
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

export default YourVideoListsPage;
