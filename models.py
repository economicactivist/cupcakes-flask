from flask import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

def db_connect(app):
    db.app = app
    db.init_app(app)


"""Models for Cupcake App."""

class Cupcake(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    image = db.Column(db.String(200), nullable=False, default="https://tinyurl.com/demo-cupcake")
    rating = db.Column(db.Float, nullable=False)
 

    def __repr__(self) -> str:
        """Provide helpful representation when printed."""
        return f"""<Cupcake id={self.id}
                    flavor={self.flavor}
                    size={self.size}
                    image={self.image}
                    rating={self.rating}>"""
                    