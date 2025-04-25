import React from "react";
import Image from "./Image";
import Video from "./Video";
import "./input.scss";

export default function Input() {
  return (
    <div class="input">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="feature-1-tab"
            data-bs-toggle="tab"
            data-bs-target="#feature1"
            type="button"
            role="tab"
            aria-controls="feature-1"
            aria-selected="true"
          >
            Image Classification
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="feature-2-tab"
            data-bs-toggle="tab"
            data-bs-target="#feature2"
            type="button"
            role="tab"
            aria-controls="feature-2"
            aria-selected="false"
          >
            Video Monitoring
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="feature1"
          role="tabpanel"
          aria-labelledby="feature-1-tab"
          tabindex="0"
        >
          <Image />
        </div>
        <div
          class="tab-pane fade"
          id="feature2"
          role="tabpanel"
          aria-labelledby="feature-2-tab"
          tabindex="0"
        >
          <Video />
        </div>
      </div>
    </div>
  );
}
