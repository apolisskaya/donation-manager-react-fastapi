from app.models.donor import Donor
from app.models.resource import Resource

from pydantic import BaseModel


class Donation(BaseModel):
    donor: Donor
    resource: Resource
