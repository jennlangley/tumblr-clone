from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(300), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'userId': self.userId,
            'postId': self.postId,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            'updated_at': self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


    
