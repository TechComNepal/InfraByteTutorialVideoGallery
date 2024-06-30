import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import "../Assets/Css/UserDropdown.css";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ username, onLogout }) => {
  let navigate = useNavigate();

  
  return (
    <Dropdown align="end" className="user-dropdown">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="dropdown-toggle-custom"
      >
        <FaUserCircle size={24} className="user-icon" /> {username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
        
          onClick={() => {
            navigate("/your-video",{replace:true});
           
          }}
        >
          Your video
        </Dropdown.Item>
        <Dropdown.Item
        
          onClick={() => {
            navigate("/add/video",{replace:true});
           
          }}
        >
          Upload a video
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
