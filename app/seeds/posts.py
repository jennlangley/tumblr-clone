from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        content="🎮🌆 Exploring Akihabara's electric streets is like stepping into a gamer's wonderland! Neon lights, anime boutiques, and a pulse of pop culture make every corner a vibrant adventure. From retro arcades to the latest tech, it's a sensory feast for any geek at heart. 🕹️💫", 
        userId=1, 
    )
    post2 = Post(
        content="The river's gentle flow harmonizes with the symphony of nature, weaving a tapestry of life along its verdant banks.", 
        userId=1, 
    )
    post3 = Post(
        content="🐚🌊 Each seashell holds a whispered tale of the sea, a testament to the beauty and resilience of nature. They are delicate treasures that remind us of sandy shores, gentle waves, and the wonders hidden beneath the surface. Collecting them is like gathering fragments of the ocean's soul. 🌟🏖️", 
        userId=2, 
    )
    post4 = Post(
        content="Space, a boundless expanse, holds secrets beyond our wildest dreams. Amongst the stars, galaxies dance, and mysteries await the curious hearts of cosmic explorers.",
        userId=3
    )
    post5 = Post(
        content='''🍂✨ Embracing the crisp kiss of autumn leaves and the scent of pumpkin spice in the air. 
        Fall, with its warm hues and cozy knits, paints a tapestry of beauty all around. 
        It's a season of change, reminding us that letting go can be a breathtaking transformation. 
        From apple-picking adventures to golden sunsets, every moment is a masterpiece. 
        Here's to bonfires, hot cocoa, and the magic of fall! 🍁🎃''',
        userId=3
    )
    post6 = Post(
        content="The horizon blazed with hues of crimson and gold as the sun dipped below the edge of the world, casting a warm embrace upon the earth.",
        userId=2
    )

    post7 = Post(
        content="""📚✨ Diving into the world of literature is like embarking on a grand adventure, 
        where each page unfolds new landscapes and characters, waiting to be discovered. 
        From the enchanting realms of fantasy to the intricate tapestries of historical fiction, 
        there's a universe for every soul. The power of words is boundless, painting vivid images in our minds and 
        stirring emotions deep within our hearts. It's in the tender solace of a well-worn book that we find refuge, 
        and in its pages, we encounter kindred spirits and wisdom that transcends time. Let's celebrate the magic that words weave, 
        the stories that resonate, and the authors who gift us these treasures. What literary gem has recently captivated your imagination?""",
        userId=3,
    )
    post8 = Post(
        content='''🌴A palm tree vacation is a slice of paradise. With golden sands, swaying fronds, and the soothing sound of waves, 
        it's a haven of relaxation and adventure. From sunrise to sunset, it's a canvas of tranquil beauty etched in memory forever.🌴''',
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
        content="🌿✨ Crafting is my sanctuary, where creativity takes flight. With every stitch, every brushstroke, I weave a piece of my soul into existence. It's not just about the end result, but the journey of imagination and discovery. Here's to the art of making, where magic unfolds in every crafted creation! 🎨🧵",
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