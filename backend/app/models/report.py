from datetime import datetime
from pydantic import BaseModel
from typing import Optional

from app.models.donor import Donor
from app.models.resource import Resource


class DonorReport(BaseModel):
    donor: Donor
    donations: list[Resource]