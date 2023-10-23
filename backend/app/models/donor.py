from pydantic import BaseModel
from typing import Optional

from app.database.tables import DonorRow


class Donor(BaseModel):
    name: str
    email: Optional[str]
    phone: Optional[str]

    @staticmethod
    def from_donor_row(donor_row: DonorRow):
        return Donor(
            name=donor_row.name,
            email=donor_row.email,
            phone=donor_row.phone,
        )

    def __eq__(self, other):
        return isinstance(other, Donor) and any(
            [
                self.name == other.name,
                self.email == other.email,
                self.phone == other.phone,
            ]
        )
    
    # needed for Donor to be usable as a key in a dict
    # see util/donor_report.py
    def __hash__(self):
        return hash(f"{self.name}-{self.email}-{self.phone}")
