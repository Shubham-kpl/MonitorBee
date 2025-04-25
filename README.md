# MonitorBee : An AI powered honey bees management and activity monitoring system

## Goals for this weekend

### Frontend

    - 	footer (contributors of project)

    - 	input image/video section

    - 	remove welcome BUZZER video

    - 	uniformity in color scheme of page

## Overview

MonitorBee is a comprehensive platform designed to:

- monitor and manage bees
- classify bee activities using advanced machine learning techniques.
- Image Classification and Video Monitoring
- Provide detailed insights into the behaviors and health of bee colonies.

## Features

### 1. Image Classification

- **Description:** Classifies bee images
- **Functionality:** Each image is analyzed, and a prediction probability is provided for each category
- **Labels:**
  - Pollen
  - Varroa mite
  - Wasp
  - Cooling state

### 2. Video Monitoring

- **Description:**
  - Tracks the in-out movement of bees
  - Detects their arcs, and
  - Classifies the arcs among the defined labels using colored dots.
- **Classification Dots:**
  - **Blue dot:** Pollen
  - **Red dot:** Varroa mite
  - **Green dot:** Bee is cooling the hive
  - **Black dot:** Detected a wasp

## Demo

Watch the demo video of the Beecognition project: [Beecognition Demo Video](https://res.cloudinary.com/drz6w1d5q/video/upload/v1719299409/beecognition-demo-video_v3krmt.mp4)

**OR**

![](./beecognition-demo-video.mp4)

## Technologies Involved

### Frontend

- **React:** For building the user interface.
- **SCSS:** For styling the application.
- **HTML5/CSS3:** Markup and style sheet languages for structuring and designing the web pages.

### Backend

- **Flask:** A lightweight WSGI web application framework in Python.
- **REST APIs:** For communication between the frontend and backend services.

### Model

- **TensorFlow/Keras:** For building and training the machine learning models.
- **OpenCV:** For real-time computer vision tasks.
- **Scikit-learn:** For additional machine learning utilities and functions.

## Installation

### Prerequisites

first install git in your system:
`https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/Git-2.47.1-64-bit.exe`

then install github desktop:
`https://central.github.com/deployments/desktop/desktop/latest/win32
`

1. Clone the repository:

   ```bash
   git clone https://github.com/Shubham-Kpl/BeeCognition.git
   ```

2. Run Frontend setup

   ```bash
   cd beecognition/frontend
   npm install
   npm run dev
   ```

3. Run Backend setup

   ```cmd
   # navigate to project root directory
   .\env\scripts\activate
   ```

   ```bash
   cd beecognition/backend
   pip install -r requirement.txt
   python main.py
   ```

4. To run the model

   ```cmd
   # navigate to project root directory
   .\env\scripts\activate
   ```

   ```bash
   cd backend/machine_learning
   python main.py --video video_path
   ```
