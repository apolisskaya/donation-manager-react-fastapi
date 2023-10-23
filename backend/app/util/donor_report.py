from app.database.donation import fetch_donations
from app.database.tables import DonationRow
from app.models.donor import Donor
from app.models.report import DonorReport
from app.models.resource import Resource

from datetime import datetime

from sqlalchemy.orm.session import Session


def generate_donor_report(database: Session) -> list[DonorReport]:
    donation_result: dict[Donor: list[Resource]] = {}
    
    donations: list[DonationRow] = fetch_donations(database)
    for donation in donations:
        donor = Donor.from_donor_row(donation.donor)
        resource = Resource.from_donation_row(donation)

        if donor not in donation_result:
            donation_result[donor] = []
        
        existing_resource = next(
            (r for r in donation_result[donor] if r.resource_type == resource.resource_type),
            None
        )
        if existing_resource:
            existing_resource.quantity += resource.quantity
        else:
            donation_result[donor].append(resource)
    
    return [
        DonorReport(
            donor=donor,
            donations=donation_result[donor]
        ) for donor in donation_result
    ]
