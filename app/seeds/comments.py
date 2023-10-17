from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        content="Seashells are beautiful", userId=1, postId=3
    )
    comment2 = Comment(
        content="wow this is fantastic", userId=1, postId=10,
    )
    comment3 = Comment(
        content="Japan is just so cool", userId=2, postId=1
    )
    comment4 = Comment(
        content="Fall weather is my favorite", userId=2, postId=5
    )
    comment5 = Comment(
        content="frankenstein, my favorite book!", userId=1, postId=7
    )
    comment6 = Comment(
        content="The colors in this image are simply stunning", userId=3, postId=6
    )
    comment7 = Comment(
        content="Stars always amazed me ⭐", userId=1, postId=4
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()