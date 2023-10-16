from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    image_1 = Image(
        imageUrl="https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_197218.jpeg", 
        postId=1 
    )
    image_2 = Image(
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1200px-Altja_j%C3%B5gi_Lahemaal.jpg", 
        postId=2, 
    )
    image_3 = Image(
        imageUrl="https://earthsky.org/upl/2023/06/Sunset-Shells-Christy-Mandeville-Feb-9-2023.jpg", 
        postId=3, 
    )
    image_4 = Image(
        imageUrl="https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/stars_feature.png", 
        postId=4,
    )

    image_5 = Image(
        imageUrl="https://i.pinimg.com/originals/83/b2/cb/83b2cb8d890e9f46405b1cf081265b5f.jpg", 
        postId=6,
    )
    image_6 = Image(
        imageUrl="https://photostorage.explorest.com/usa/hawaii/vlim-mai-poina-palmtree-feed.jpg", 
        postId=8,
    )
    image_7 = Image(
        imageUrl="https://gwennseemel.com/images/2012/2012CANMeerkatGwennSeemel.gif",
        postId=10,
    )


    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.add(image_4)
    db.session.add(image_5)
    db.session.add(image_6)
    db.session.add(image_7)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        
    db.session.commit()