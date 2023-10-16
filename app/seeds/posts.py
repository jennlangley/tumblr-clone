from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        content="🎮🌆 Exploring Akihabara's electric streets is like stepping into a gamer's wonderland! Neon lights, anime boutiques, and a pulse of pop culture make every corner a vibrant adventure. 🕹️💫", 
        userId=1, 
    )
    post2 = Post(
        content="The river's gentle flow harmonizes with the symphony of nature, weaving a tapestry of life along its verdant banks.", 
        userId=1, 
    )
    post3 = Post(
        content="🐚🌊 Each seashell holds a whispered tale of the sea, a testament to the beauty and resilience of nature. They are delicate treasures that remind us of sandy shores, gentle waves, and the wonders hidden beneath the surface.🌟🏖️", 
        userId=2, 
    )
    post4 = Post(
        content="Space, a boundless expanse, holds secrets beyond our wildest dreams. Amongst the stars, galaxies dance, and mysteries await the curious hearts of cosmic explorers.",
        userId=3
    )
    post5 = Post(
        content="🍂✨ Embracing the crisp kiss of autumn leaves and the scent of pumpkin spice in the air. Fall, with its warm hues and cozy knits, paints a tapestry of beauty all around. Here's to bonfires, hot cocoa, and the magic of fall! 🍁🎃",
        userId=3
    )
    post6 = Post(
        content="The horizon blazed with hues of crimson and gold as the sun dipped below the edge of the world, casting a warm embrace upon the earth.",
        userId=2
    )

    post7 = Post(
        content="📚✨ Dive into the boundless world of literature! With each page, we embark on adventures, meet unforgettable characters, and explore enchanting realms. Words have the power to paint vivid images and stir deep emotions. What book has recently captured your heart?",
        userId=3,
    )
    post8 = Post(
        content='''🌴A palm tree vacation is a slice of paradise. With golden sands, swaying fronds, and the soothing sound of waves, it's a haven of relaxation and adventure. From sunrise to sunset, it's a canvas of tranquil beauty etched in memory forever.🌴''',
        userId=1
    )
    post9 = Post(
        content="""🎬✨ Just watched "Inception" and I'm still caught in its mind-bending maze. Nolan's genius, the dream within a dream, it's a cinematic marvel! The layers of reality kept me hooked till the end. What's your favorite movie mind-bender? 🌌🧠""",
        userId=2,
    )
    post10 = Post(
        content="Meerkats: tiny creatures, big personalities! Their teamwork and curiosity in the wild are a true inspiration. 🌍💫",
        userId=3
    )
    post11 = Post(
        content="🎨✂️ Embracing the art of crafting is like weaving a tapestry of creativity. Each stitch, each brushstroke, is a brush with magic. Whether it's knitting cozy scarves or painting vibrant scenes, let your imagination run wild! What's your latest crafting project? Share the love! 💖",
        userId=2
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()