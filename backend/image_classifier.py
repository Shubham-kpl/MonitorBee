# import sys
# print("Using interpreter:", sys.executable)

from fastapi import FastAPI, File, UploadFile, HTTPException
import uvicorn
from pydantic import BaseModel #used for data validation,create data models for request and response bodies, ensuring the data conforms to the expected format.
import tensorflow as tf  #load and run pretrained model
import cv2
import logging #log messages
import shutil #handling file operation like copying and moving
import os #using os dependent functionalities like making directories
import numpy as np #handling numeric operations
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Setting up the FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Directory to save uploaded files
UPLOAD_DIRECTORY = "uploaded_files"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)  # Create the directory if it doesn't exist

# Loading the model
model_path = 'F:\shubham programming\projects\MonitorBee\model\model.h5'
logger.debug(f"Loading model from: {model_path}")
model = tf.keras.models.load_model(model_path, compile=False) 

# Manual compilation of model
model.compile(
    optimizer='adam',   # or whatever you used
    loss='binary_crossentropy',  # or categorical_crossentropy depending on your model
    metrics=['accuracy']
)
model.trainable = False
logger.info("Model loaded successfully")

# Print the model summary
# print("Model Summary:")
# model.summary()

class_labels = ["varroa", "pollen", "wasp", "cooling"]

# Return type of the prediction function
class PredictionResult(BaseModel):
    label: str
    probability: float

@app.post("/upload-img")
async def upload_img(file: UploadFile = File(...)):
    try:
        # print(f"filename:  {file.filename}")
        file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)

        # Perform prediction after saving the file
        prediction = predict(file_location)
        return prediction
    
    except Exception as e:
        logger.error(f"Error uploading file: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

def predict(image_path: str) -> PredictionResult:
    try:
        # Load and preprocess the image
        img = cv2.imread(image_path)
        # print(img) #numpy array

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image path")
        
        # Image Preprocessing
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_resized = tf.image.resize(img_rgb, [150, 75]).numpy().astype('float32') / 255.0
        img_expanded = np.expand_dims(img_resized, axis=0)

        # Prediction
        prediction = model.predict(img_expanded)
        logger.debug(f"Model prediction output: {prediction}")

        # Handle the list of arrays output
        probabilities = [pred[0][0] for pred in prediction]
        print(probabilities)
        
        # Class with maximum probability
        max_prob_index = np.argmax(probabilities)
        max_label = class_labels[max_prob_index]
        max_prob = probabilities[max_prob_index]

        return PredictionResult(label=max_label, probability=max_prob)
    
    except Exception as e:
        logger.error(f"Failed to process the image and generate prediction: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
