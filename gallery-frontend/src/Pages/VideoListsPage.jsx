import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryAccordion from "../Components/category/CategoryAccordion";
import  {category}  from '../data/category';
import ThumbnailGrid from "../Components/category/ThumbnailGrid";

const VideoListsPage = () => {

    const [selectedItem, setSelectedItem] = useState(null);

  return (
    <body>
      <Container className="mt-5 mb-5" >
        <Row>
          <Col md={3}>
            <CategoryAccordion  data={category} setSelectedItem={setSelectedItem}  />
          </Col>
          <Col md={9}><div className="output">
          <ThumbnailGrid selectedItem={selectedItem} />
          </div>
          </Col>
        </Row>
      </Container>
    </body>
  );
};

export default VideoListsPage;
