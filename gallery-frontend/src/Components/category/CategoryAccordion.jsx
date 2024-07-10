import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "../../Assets/Css/CategoryAccordion.css";
import { getJobTutorialsByCategorySubCategory } from "../../config/config";
import { getHeaders } from "../../services/auth";
import axios from "axios";

const CategoryAccordion = ({ data, setSelectedItem, modalClose }) => {
  const [selectedItem, setSelectedAccordionItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = async (itemId) => {
    var item = data.reduce((acc, category) => {
      const foundItem = category.subcategories
        .flatMap((subcategory) => subcategory.items)
        .find((item) => item.id === itemId);
      if (foundItem) {
        return foundItem;
      }
      return acc;
    }, null);
    modalClose();
    var reqData = {
      category: selectedCategory ?? "Dashboard",
      subCategory: item.title,
    };
    var resData;
    await axios
      .post(getJobTutorialsByCategorySubCategory, reqData, {
        headers: getHeaders(),
      })
      .then((response) => {
        console.log(response.data);
        resData = response.data;
        // setSelectedItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    if (resData != null) {
      setSelectedItem(resData);
    } else {
      alert("Video are not available");
    }
    setSelectedAccordionItem(item);
  };

  return (
    <Accordion defaultActiveKey="0">
      {data.map((category) => (
        <Accordion.Item
          eventKey={category.categoryId.toString()}
          key={category.categoryId}
          // onClick={(e)=>{setSelectedCategory(e)}}
        >
          <Accordion.Header
            className={
              selectedItem != null &&
              selectedItem.categoryId == category.categoryId
                ? "active"
                : ""
            }
            id={category.categoryName}
            onClick={(e) => {
              setSelectedCategory(e.target.textContent);
            }}
          >
            {category.categoryName}
          </Accordion.Header>
          <Accordion.Body>
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.subcategoryId}>
                {/* <h5>{subcategory.subcategoryName}</h5> */}
                <ul>
                  {subcategory.items.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={
                        selectedItem != null && selectedItem.id == item.id
                          ? "active"
                          : ""
                      }
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default CategoryAccordion;
