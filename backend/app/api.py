from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.donation_router import router as donation_router
from app.routers.distribution_router import router as distribution_router
from app.routers.report_router import router as report_router
from app.database import db


app = FastAPI()
app.include_router(donation_router)
app.include_router(distribution_router)
app.include_router(report_router)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("shutdown")
def shutdown():
    db.close()
