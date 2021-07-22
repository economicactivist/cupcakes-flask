from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from models import db, db_connect, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "KJOJKLJKJLKJL"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug=True

debug = DebugToolbarExtension(app)

db_connect(app)
# db.drop_all()
db.create_all()

def serialize_cupcake(cupcake):
    return {
        'id': cupcake.id,
        'image': cupcake.image,
        'rating': cupcake.rating,
        'flavor': cupcake.flavor,
        'size': cupcake.size,
    }

@app.route('/')
@app.route('/cupcakes')
def index():
    return render_template('index.html')




@app.route('/api/cupcakes')
def get_cupcakes():
    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(cupcake) for cupcake in cupcakes]
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(serialize_cupcake(cupcake))

@app.route('/api/cupcakes', methods=['POST'])
def add_cupcake():
    cupcake = Cupcake(
        image=request.json['image'],
        rating=request.json['rating'],
        flavor=request.json['flavor'],
        size=request.json['size']
    )
    print('*****************')
    print(cupcake)
    print('*****************')
    db.session.add(cupcake)
    db.session.commit()
    return (jsonify(serialize_cupcake(cupcake)), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def edit_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.image = request.json['image']
    cupcake.rating = request.json['rating']
    cupcake.flavor = request.json['flavor']
    cupcake.size = request.json['size']
    db.session.commit()
    return (jsonify(serialize_cupcake(cupcake)), 200)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    #code 204 means 'no content' (https://restfulapi.net/http-status-204-no-content/)
    return (jsonify({}), 204) 
 


