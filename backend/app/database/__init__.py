from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///mydatabase.db")
db = sessionmaker(bind=engine)()
