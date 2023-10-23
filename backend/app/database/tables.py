from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData

from datetime import datetime

from app.models.resource import ResourceType


metadata = MetaData()

Base = declarative_base()

donors = Table(
    "donors",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("name", String, index=True),
    Column("email", String, index=True, nullable=True),
    Column("phone", String, index=True, nullable=True),
    Column("created_at", DateTime, default=datetime.utcnow),
)

class DonorRow(Base):
    __table__ = donors

    donations = relationship("DonationRow", back_populates="donor")


donations = Table(
    "donations",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("donor_id", Integer, ForeignKey("donors.id")),
    Column("resource_type", Enum(ResourceType)),
    Column("quantity", Integer),
    Column("created_at", DateTime, default=datetime.utcnow),
)

class DonationRow(Base):
    __table__ = donations

    donor = relationship("DonorRow", back_populates="donations")


distributions = Table(
    "distributions",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("resource_type", Enum(ResourceType)),
    Column("quantity", Integer),
    Column("created_at", DateTime, default=datetime.utcnow),
)

class DistributionRow(Base):
    __table__ = distributions