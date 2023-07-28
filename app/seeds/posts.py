from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    first_post = Post(
        content="This is my first post!", userId=1, 
    )
    second_post = Post(
        content="This is my second post!", userId=1, 
    )
    third_post = Post(
        content="I love this site", userId=2, 
    )

    db.session.add(first_post)
    db.session.add(second_post)
    db.session.add(third_post)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()