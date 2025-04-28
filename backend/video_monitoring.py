import subprocess
from fastapi import FastAPI, BackgroundTasks, File, UploadFile, HTTPException
import os
import shutil
from typing import Optional
import logging
import sys
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)

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

monitoring_process = None
script_path = "./machine_learning/main.py"

def start_monitoring(video_path: Optional[str] = None):
    global monitoring_process
    command = [sys.executable, script_path]
    if video_path:
        command.extend(["--video", video_path])
    monitoring_process = subprocess.Popen(command)

def stop_monitoring():
    global monitoring_process
    if monitoring_process and monitoring_process.poll() is None:
        monitoring_process.kill()  # Use kill() instead of terminate()
        monitoring_process.wait()
        return {"message": "Monitoring stopped successfully"}

@app.post("/upload-vid")
async def upload_vid(background_tasks:BackgroundTasks, file: UploadFile = File(...)):
    try:
        file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
            
        background_tasks.add_task(start_monitoring, file_location)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

@app.post("/stop-monitoring")
async def stop_monitoring():
    print("Monitoring stopped")
    stop_monitoring()
    return {"message": "Monitoring stopped"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
