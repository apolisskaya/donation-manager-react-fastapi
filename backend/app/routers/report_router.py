from fastapi import APIRouter

from app.database import db
from app.models.resource import Resource
from app.models.report import DonorReport
from app.util.donor_report import generate_donor_report
from app.util.inventory_report import generate_inventory_report


router = APIRouter(
    prefix="/report",
    tags=["report"],
)

@router.post("/inventory", response_model=list[Resource], status_code=200)
def handle_create_inventory_report() -> list[Resource]:
    return generate_inventory_report(db)

@router.post("/donor", response_model=list[DonorReport], status_code=200)
def handle_create_donor_report() -> list[DonorReport]:
    return generate_donor_report(database=db)
