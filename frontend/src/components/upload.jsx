import React from "react";
import "./css/upload.css";

export default function Upload() {
  return (
    <div className="test-the-model" id="test-the-model">
      <h1 style={{ marginBottom: "2rem" }}>Test the Model</h1>
      <div className="file-upload-container" id="file-upload-container">
        <div className="upload-section upload-image">
          <h2 style={{ marginTop: "0.5rem", marginBottom: "1.2rem" }}>
            Upload Image
          </h2>
          <form>
            <input type="file" accept="image/*" />
            <button className="form-button">Submit Image</button>
          </form>
        </div>
        <div className="upload-section upload-video">
          <h2 style={{ marginTop: "0.5rem", marginBottom: "1.2rem" }}>
            Upload Video
          </h2>
          <form>
            <input type="file" accept="video/*" className="upload" />
            <button className="form-button">Submit Video</button>
          </form>
        </div>
      </div>
    </div>
  );
}
