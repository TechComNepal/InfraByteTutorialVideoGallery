import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getHeaders } from "../services/auth";
import { getJobsTutorialByTags } from "../config/config";
import axios from "axios";
import ThumbnailGrid from "../Components/category/ThumbnailGrid";
import noThumbnail from "../Assets/images/no_thumbnail.jpg";
import PlayButtonOverlay from "../Components/category/PlayButtonOverlay";

const SearchPage = () => {
  const location = useLocation();
  var [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const [selectedItem, setSelectedItem] = useState(null);
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
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        setLoading(true);
        if(query!=undefined){
            const response = await axios.get(
                `${getJobsTutorialByTags}?tags=${query}`,
                {
                  headers: getHeaders(),
                }
              );
              setData(response.data);
        }
  
      
      setLoading(false);
    } catch (err) {
      // console.error("fetch failed:", err);
      toast.info("Error fetching data: " + err.message);
      setLoading(false);
    }
  };
  return (
    <div className="container">
     
      
      <div className="video-player mt-5">
        <video controls autoPlay key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {loading && (
        <span>
          <div className="loading-spinner"></div>
        </span>
      )}
      {/* {data[0]["id"]} */}
      {data && (
              <>
               
                <center>
                  <div className="thumbnails">
                    {data.map((thumbnail, index) => (
                      <div className="thumbnail-container" key={index}>
                        <div key={index} className="thumbnail-item">
                          {thumbnail.thumbnailName != null ? (
                            <img
                              src={`${thumbnail.storageUrl}/${thumbnail.thumbnailPath}`}
                              alt={thumbnail.fileName}
                              className="thumbnail-image "
                              onClick={() => playVideo(thumbnail.filePath)}
                            />
                          ) : (
                            <img
                              src={noThumbnail}
                              alt="No image"
                              className="thumbnail-image "
                              onClick={() => playVideo(thumbnail.filePath)}
                            />
                            // <video src={thumbnail.filePath} className="thumbnail-image" onClick={() => playVideo(thumbnail.filePath)}></video>
                          )}
                          
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
    </div>
  );
};

export default SearchPage;
