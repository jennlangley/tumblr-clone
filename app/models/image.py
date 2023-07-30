from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    imageUrl = db.Column(db.String, nullable=True)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    post = db.relationship("Post", back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'imageUrl': self.imageUrl,
            'postId': self.postId,
        }
