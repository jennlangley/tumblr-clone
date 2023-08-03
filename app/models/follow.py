from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(db.Integer)
    followedId = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'followerId': self.followerId,
            'followedId': self.followedId
        }
    
user_follows = db.Table(
    "user_follows",
    db.Column("followerId", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("followedId", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)
if environment == "production":
    user_follows.schema = SCHEMA