from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .images import seed_images, undo_images
from .comments import seed_comments, undo_comments
from .follows import seed_follows, undo_follows
from .likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
        undo_images()
        undo_comments()
        undo_likes()
        undo_follows()

    seed_users()
    # Add other seed functions here
    seed_posts()
    seed_images()
    seed_comments()
    seed_likes()
    seed_follows()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_posts()
    undo_images()
    undo_comments()
    undo_likes()
    undo_follows()