from fastapi import APIRouter, Body

from app.database import db
from app.database.donation import create_donation
from app.models.donation import Donation


router = APIRouter(
    prefix="/donation",
    tags=["donation"],
)


@router.post("/create", response_model=Donation, status_code=200)
def handle_create_donation(donation: Donation = Body(..., description="Donation to create.")) -> Donation:
    create_donation(database=db, donation=donation)
    return donation