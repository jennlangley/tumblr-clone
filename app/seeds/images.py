from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    image_1 = Image(
        imageUrl="https://placekitten.com/408/287", postId=1 
    )
    image_2 = Image(
        imageUrl="https://placekitten.com/200/286", postId=2, 
    )
    image_3 = Image(
        imageUrl="https://placekitten.com/200/140", postId=3, 
    )

    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        
    db.session.commit()