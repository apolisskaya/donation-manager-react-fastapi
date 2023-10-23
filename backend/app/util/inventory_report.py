from app.database.donation import fetch_donations
from app.database.distribution import fetch_distributions
from app.database.tables import DonationRow, DistributionRow
from app.models.resource import Resource, ResourceType

import logging

from sqlalchemy.orm.session import Session


logger = logging.getLogger(__name__)

def generate_inventory_report(database: Session) -> list[Resource]:
    inventory = {r: 0 for r in ResourceType}

    donations: list[DonationRow] = fetch_donations(database)
    distributions: list[DistributionRow] = fetch_distributions(database)

    for donation in donations:
        try:
            inventory[donation.resource_type] += donation.quantity
        except Exception as e:
            logger.exception(f"exception while processing donations, {str(e)}")
            continue
    
    for distribution in distributions:
        try:
            inventory[distribution.resource_type] -= distribution.quantity
        except Exception as e:
            logger.exception(f"exception while processing distributions, {str(e)}")
            continue
    
    return [
        Resource(
            resource_type=resource_type,
            quantity=quantity
        ) for resource_type, quantity in inventory.items()
    ]
