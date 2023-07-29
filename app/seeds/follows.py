from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    follow1 = Follow(
        followerId=1, followedId=2
    )
    follow2 = Follow(
        followerId=1, followedId=3
    )
    follow3 = Follow(
        followerId=2, followedId=1
    )
    follow4 = Follow(
        followerId=2, followedId=3
    )
    follow5 = Follow(
        followerId=3, followedId=1
    )
    follow6 = Follow(
        followerId=3, followedId=2
    )

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)
    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))
        
    db.session.commit()