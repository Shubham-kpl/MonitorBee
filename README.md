# MonitorBee : An AI powered honey bees management and activity monitoring system

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

Watch the demo video of the Beecognition project: [Beecognition Demo Video](./data/beecognition-demo-video.mp4)

## How does it work

1. Each frame provided by the camera (or video file) will be processed to identify the bees in the image. The found bee positions will then be used to reconstruct the bee movements and paths using kalman filters. The paths are then used to count the bees entering or leaving the hive. Where the hive entry is on the upper part of the filmed pane and the exit is on the bottom.

2. Each detected bee will then be cut from the image, rotated and forwarded to a neural network for classification.

3. The neural network performs simple classification tasks to identify bees with pollen, varroa mite infected bees, bees cooling the hive or wasp and counts them. The results can also be visualized. The neural network runs in a separate process and the results may be too late to visualize them, as the bee may have already left the filmed area. But that depends on the performance of the used system.

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

## Run on your device

### Prerequisites

<p>first install git in your system:</p>

```cmd
https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/Git-2.47.1-64-bit.exe
```

<p>then install github desktop:</p>

```cmd
https://central.github.com/deployments/desktop/desktop/latest/win32
```

### Installations and Set Up

<ol>
  <li>
   <h2> Clone the repository:</h2>

    ```cmd
    git clone
    https://github.com/Shubham-Kpl/BeeCognition.git
    ```

  </li>
  <li> 
  <h2>Run Frontend setup</h2>

```cmd
cd frontend npm install npm run dev
```

 </li>

<li>
<h2>Run Backend setup</h2>

  <p> Before anything, create and activate a virtual environment </p>

```cmd
python -m venv env .\env\scripts\activate
```

  <p>Install requirements</p>

```cmd
cd backend pip install -r requirements.txt
```

  <p>Finally run backend</p>

```cmd
# You might need to change model_path in various files (e.g.
backend/image_classifier, backend/video_monitoring) python main.py
```

</li>
</ol>

### To run the model independently

```cmd
# navigate to project root directory
.\env\scripts\activate
```

```cmd
cd backend/machine_learning
python main.py --video video_path
```

## What is still to do?

- Optimize the neural network with live data. Currently everything is based on video material that was captured at the end of the year.
- The neural network is trained on images of the size 75x150 pixels. The results may be better with larger images, but the impact to the performance has to be evaluated.
- Optimize tracking. Some bee tracks are still lost, especially when bees fly around in the camera system.
- Camera input was not yet implemented. Just a minor thing, but I cannot test anything, because the bees are already hibernating.
- Write documentation

## Goals for this weekend

### Frontend

- Put in readme where all you changed model path

- Beautify errors and alerts (use closable attractive models)

- Show monitoring video on webpage (instead of python dialog) : Handle routes properly (install dependencies)

- Nav Bar

- uniformity in color scheme of page

-✅footer (contributors of project)

-✅separate input image/video section

-✅remove welcome BUZZER video

- if possible, change the url (based on different sections) when we navigate up and down (manually)

- provide a good look to image/video input section

- display `nice-looking-cuttable model` upon any error on image/video upload

- when we upload an image, the "Input" section must expand downwards and all the components below it must move downwards (with an eye pleasing transition effect)

- beautify the dropdown of "About Us"

### Backend

- Stop Video monitoring when button is clicked / any key is pressed

- nicely handle `image/video` input failures and display nicely on frontend

-✅ handle image/video upload failure (fix errors in code)

-✅ resolve old dependencies and libraries

-✅ model not loading successfully (compilation issue) : Manual Compilation

### Model

- Ability to stop monitoring upon clicking (say esc or something) in the video field

- Output for each comes out varroa

- Fix Probability of image prediction > 1 (not possible)
