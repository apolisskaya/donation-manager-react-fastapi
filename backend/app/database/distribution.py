from datetime import datetime

from app.database.tables import DistributionRow
from app.models.distribution import Distribution

from sqlalchemy.orm.session import Session


def create_distribution(database: Session, distribution: Distribution) -> None:
    distribution_resource = distribution.resource.dict()
    new_distribution = DistributionRow(**distribution_resource)

    database.add(new_distribution)
    database.commit()

def fetch_distributions(database: Session, start_time: datetime = None, end_time: datetime = None) -> list[DistributionRow]:
    query = database.query(DistributionRow)
    if start_time:
        query = query.filter(DistributionRow.created_at >= start_time)
    if end_time:
        query = query.filter(DistributionRow.created_at <= end_time)

    distributions = query.all()
    return distributions
