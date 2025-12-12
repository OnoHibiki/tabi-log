# AWSはお金がかかるため、一旦FastAPI

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def read_root():
    return{
        "message" : "Hello from Local FastAPI BackEnd!",
        "status"  : "success"
    }

@app.get("/api/hello")
def read_hello():
    return {
        "message" : "PythonとNext.jsが繋がりました!"
    }