from enum import Enum
from pydantic import BaseModel


class ResourceType(str, Enum):
    MONEY = "money"
    FOOD = "food"
    CLOTHING = "clothing"

class Resource(BaseModel):
    resource_type: ResourceType
    quantity: int

    @staticmethod
    def from_donation_row(donation_row):
        return Resource(
            resource_type=donation_row.resource_type,
            quantity=donation_row.quantity,
        )
    
    @staticmethod
    def from_distribution_row(distribution_row):
        return Resource(
            resource_type=distribution_row.resource_type,
            quantity=distribution_row.quantity,
        )
