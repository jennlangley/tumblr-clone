from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        content="Great post!", userId=1, postId=1
    )
    comment2 = Comment(
        content="Nice", userId=2, postId=2,
    )
    comment3 = Comment(
        content="Wow", userId=3, postId=3
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()