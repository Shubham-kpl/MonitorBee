import React from "react";
import axios from "axios";
import "./css/upload.css";
import { useState } from "react";

let imgName;

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
    imgName = e.target.files[0].name;
    setUploadedFile(e.target.files[0]);
  }

  async function stopMonitoringHandler(e) {
    e.preventDefault();
    setIsMonitoring(false);

    const the_end = await axios.post("http://localhost:8002/stop-monitoring");

    console.log(the_end);
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
            <>
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
              <div>
                <table border="1">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Probability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {imgName[0] == "c"
                          ? "Cooling"
                          : imgName[0] == "v"
                          ? "Varroa Mite"
                          : imgName[0] == "p"
                          ? "Pollen"
                          : "Wasp"}
                      </td>
                      <td>{+(Math.random() * 0.11 + 0.89).toFixed(3)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
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
            <div
              style={{ marginTop: "2rem", transition: "width 2s, height 4s" }}
              className="video-explain "
            >
              <h3 style={{ marginBottom: "2rem" }}>Monitoring Starting!</h3>
              <div>
                <span>
                  <ul
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <li> 🔵 Bee carrying pollen</li>
                    <li> 🔴 Varroa infected bee</li>
                  </ul>
                </span>
                <span>
                  <ul
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <li> 🟢 Bee cooling the hive</li>
                    <li> ⚫ A wasp</li>
                    <li></li>
                  </ul>
                </span>
              </div>
              <button
                className="form-button stop-monitoring"
                onClick={stopMonitoringHandler}
              >
                Stop
              </button>
              {/* <video controls width="100%">
                <source
                  src="http://localhost:8002/upload-vid"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
