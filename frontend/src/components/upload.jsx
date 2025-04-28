import React from "react";
import axios from "axios";
import "./css/upload.css";
import { useState } from "react";

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImgUrl, setUploadedImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  // To handle image upload
  async function imgUploadHandler(e) {
    e.preventDefault();
    if (!uploadedFile) {
      alert("Please select a file to upload");
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    console.log(uploadedFile);
    console.log(formData);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // No '+', separate values
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/upload-img",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res);
      const { label, probability } = res.data;
      setPrediction({ label, probability });
      setUploadedImageUrl(URL.createObjectURL(uploadedFile));
    } catch (err) {
      alert("Failed to upload/process image");
    }
  }

  async function vidUploadHandler(e) {
    e.preventDefault();
    if (!uploadedFile) {
      alert("Please select a file to upload");
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const res = await axios.post(
        "http://localhost:8002/upload-vid",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setIsMonitoring(true);
    } catch (err) {
      alert("Failed to upload/process video");
    }
  }

  function handleFileChange(e) {
    console.log(e.target.files[0]);
    setUploadedFile(e.target.files[0]);
  }

  return (
    <div className="test-the-model" id="test-the-model">
      <h1 style={{ marginBottom: "2rem" }}>Test the Model</h1>
      <div className="file-upload-container" id="file-upload-container">
        <div className="upload-section upload-image">
          <h2 style={{ marginTop: "0.5rem", marginBottom: "1.2rem" }}>
            Upload Image
          </h2>
          <form>
            <input type="file" onChange={handleFileChange} />
            <button
              className="form-button upload-img"
              onClick={imgUploadHandler}
            >
              Upload
            </button>
          </form>

          {uploadedImgUrl && (
            <div>
              <img
                src={uploadedImgUrl}
                alt="Uploaded Image"
                style={{
                  maxWidth: "200px",
                  margin: "2rem 0",
                  transition: "1s ease",
                }}
              />
            </div>
          )}
          {prediction && (
            <div>
              <p>Label: {prediction.label}</p>
              <p>probability: {prediction.probability}</p>
            </div>
          )}
        </div>
        <div className="upload-section upload-video">
          <h2 style={{ marginTop: "0.5rem", marginBottom: "1.2rem" }}>
            Upload Video
          </h2>
          <form>
            <input type="file" onChange={handleFileChange} />
            <button
              className="form-button upload-vid"
              onClick={vidUploadHandler}
            >
              Upload
            </button>
          </form>
          {isMonitoring && (
            <div style={{ marginTop: "20px" }} className="video-explain">
              <h3>Monitoring Started!</h3>
              <ul>
                <li>Blue dot: Pollen</li>
                <li>Red dot: Varroa mite</li>
                <li>Green dot: Bee is cooling the hive</li>
                <li>Black dot: Detected a wasp</li>
              </ul>
              <video controls width="600">
                <source
                  src="http://localhost:8002/upload-vid"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
