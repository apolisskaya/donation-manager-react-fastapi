from fastapi import APIRouter, Body

from app.database import db
from app.database.distribution import create_distribution
from app.models.distribution import Distribution


router = APIRouter(
    prefix="/distribution",
    tags=["distribution"],
)

@router.post("/create", response_model=Distribution, status_code=200)
def handle_create_distribution(distribution: Distribution = Body(..., description="Distribution to create.")) -> Distribution:
    create_distribution(database=db, distribution=distribution)
    return distribution
