import subprocess
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def main():
    exe = sys.executable
    # Execute the image classifier script
    p1=subprocess.Popen([exe, "image_classifier.py"])
    
    # Execute the video monitoring script
    p2=subprocess.Popen([exe, "video_monitoring.py"])

    p1.wait()
    p2.wait()

if __name__ == "__main__":
    main()
