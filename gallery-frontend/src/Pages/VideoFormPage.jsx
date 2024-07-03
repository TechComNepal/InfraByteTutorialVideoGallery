import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { category } from "../data/category";
import "../Assets/Css/Login.css";

const VideoFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [validated, setValidated] = useState(false);

 
  const [videos, setVideos] = useState([]);
  const [videoURLs, setVideoURLs] = useState([]);
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const [categorySelected, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (inputValue.trim()) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    const maxSize = 50 * 1024 * 1024; // 50MB

    let validFiles = [];
    let validUrls = [];
    files.forEach(file => {
        if (allowedTypes.includes(file.type) && file.size <= maxSize) {
            validFiles.push(file);
            validUrls.push(URL.createObjectURL(file))
        } else {
            setError('Some files are not supported or exceed the size limit of 50MB.');
        }
    });

    setVideos([...videos, ...validFiles]);

      setError("");
    setVideoURLs([ ...validUrls])

    
  };

  let navigate = useNavigate();

  const handleSubmit =async  (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

   

    console.log("Tags:", tags);
    // 'Video on Job Booking'
    var data = {
      title: title,
      tags: tags,
      category: categorySelected,
      sub_category: subcategory,
      description: description,
      // fileName: video.name,
    };
    if (videos.length === 0) {
      setError('Please upload at least one video before submitting.');
      return;
  }

  const formData = new FormData();
  videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
  });
  formData.append('tags', JSON.stringify(tags));

  try {
      const response = await axios.post('/upload', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      console.log('Upload successful:', response.data);
  } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
  }
    console.log(data);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);  
    setSubcategory(""); // Reset subcategory when category changes

    const categoryObject = category.find(cat => cat.categoryName === selectedCategory);
    var subCat= categoryObject ? categoryObject.subcategories[0]['items'] : [];
    setSubcategories(subCat)
   
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
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
      <Container className="form-container mt-5">
        <a
          variant="primary"
          className="button-container  "
          onClick={() => {
            navigate("/your-video", { replace: true });
          }}
        >
          Your videos
        </a>
        {/* <Button
          onClick={() => {
            navigate("/add/video", { replace: true });
          }}
        >
          Upload a video
        </Button> */}
        <Col className="justify-content-space-around d-flex flex-column mt-3">
          <Col className="mt-3">
            <h2 className="heading3 mb-4">Upload infrabyte video</h2>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {
                <div className="video-preview">
                {videoURLs.map((videoURL) => (
                    <video controls key={videoURL}>
                    <source
                      src={videoURL}
                      type="video/mp4"
                      // type={video != null ? video.type : "video/mp4"}
                    />
                    Your browser does not support the video tag.
                  </video>
                  ))}
                </div>
              }
              
              
              <Form.Group controlId="video" className="mt-3">
                <Form.Label>Choose a video</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Upload"
                  id="video-upload"
                  accept="video/mp4, video/webm, video/ogg"
                  onChange={handleFileChange}
                  required
                  multiple
                 
                />

                <Form.Control.Feedback type="invalid">
                  {error && <div className="error-message">{error}</div>}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Add tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Add tags (press enter or comma)"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleInputKeyPress}
                  required
                />
                <ul className="tags-list">
                  {tags.map((tag, index) => (
                    <li key={index} className="tag">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                      >
                        <i className="fas fa-close"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <Form.Control.Feedback type="invalid">
                  Please provide a tags.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicSelect" className="mt-3">
                <Form.Label>Select a category</Form.Label>
                <Form.Control
                  placeholder="Title"
                  as="select"
                  value={categorySelected}
                  onChange={handleCategoryChange}
                  id="category"
                  required
                >
                  {" "}
                  <option value="">Select a category</option>
                  {category.map((cat) => (
                    <option key={cat.categoryName} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please Select a category.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicSelect" className="mt-3">
                <Form.Label>Select a sub category</Form.Label>
                <Form.Control
                  as="select"
                  id="subcategory"
                  value={subcategory}
                  onChange={handleSubcategoryChange}
                  disabled={!categorySelected}
                  required
                >
                  {" "}
                  <option value="">Select a subcategory</option>
                  {subcategories.map((subcat) => (
                    <option key={subcat.id} value={subcat.title}>
                      {subcat.title}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please Select a sub category.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                className="mt-3"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  placeholder="Description"
                  value={description}
                  cols="40"
                  rows="5"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a descrition.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="container d-flex mt-3">
                <Button
                  variant="primary"
                  className="button-container mt-3  "
                  type="submit"
                  block
                >
                  Submit
                </Button>{" "}
                <Button
                  variant="primary"
                  className="button-container cancel mt-3 mx-2"
                  block
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Col>
      </Container>
    </>
  );
};

export default VideoFormPage;
