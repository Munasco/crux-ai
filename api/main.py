from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins for simplicity, since the frontend is on a different domain.
# For a production application, you should restrict this to your frontend's actual URL.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World from the API root"}

@app.get("/test")
def test_endpoint():
    return {"message": "This is a test endpoint from your FastAPI backend!"} 