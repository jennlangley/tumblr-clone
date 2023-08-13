from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id porta nibh venenatis cras sed felis. Tincidunt ornare massa eget egestas purus viverra. Nibh venenatis cras sed felis eget velit aliquet.", 
        userId=1, 
    )
    post2 = Post(
        content="Lorem donec massa sapien faucibus et molestie. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Molestie at elementum eu facilisis. Duis at tellus at urna.", 
        userId=1, 
    )
    post3 = Post(
        content="Duis at tellus at urna condimentum mattis. Eros donec ac odio tempor orci dapibus ultrices in. Sodales ut etiam sit amet nisl purus in. Duis ut diam quam nulla porttitor massa. Mauris a diam maecenas sed enim.", 
        userId=2, 
    )
    post4 = Post(
        content="Starry skies :)",
        userId=3
    )
    post5 = Post(
        content='''Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.''',
        userId=3
    )
    post6 = Post(
        content="I love the sunset",
        userId=2
    )

    post7 = Post(
        content="A diam sollicitudin tempor id eu nisl nunc mi ipsum. Magna etiam tempor orci eu lobortis elementum nibh.",
        userId=3,
    )
    post8 = Post(
        content="I love the beach...",
        userId=1
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()