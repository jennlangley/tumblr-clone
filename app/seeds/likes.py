from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(
        userId=1, postId=3
    )
    like2 = Like(
        userId=2, postId=1
    )
    like3 = Like(
        userId=3, postId=1
    )
    like4 = Like(
        userId=1, postId=4
    )


    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        
    db.session.commit()