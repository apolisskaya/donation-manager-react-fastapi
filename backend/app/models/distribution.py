from app.models.resource import Resource

from pydantic import BaseModel


class Distribution(BaseModel):
    resource: Resource
