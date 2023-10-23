from app.database.tables import DonationRow, DonorRow
from app.models.donation import Donation

from sqlalchemy.orm.session import Session


def create_donation(database: Session, donation: Donation) -> None:
    donor_resource = donation.donor.dict()
    new_donor = DonorRow(**donor_resource)

    donation_resource = donation.resource.dict()
    new_donation = DonationRow(**donation_resource)

    new_donation.donor = new_donor
    database.add(new_donor)
    database.add(new_donation)
    database.commit()


def fetch_donations(database: Session) -> list[DonationRow]:
    return database.query(DonationRow).all()
    