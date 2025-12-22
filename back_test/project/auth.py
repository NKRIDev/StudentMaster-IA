from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return 'Login'

@auth.route('/api/auth/register', methods=["POST"])
@cross_origin()
#@cross_origin(origins=["http://localhost:5173"])
def signup():
    email = request.get_json()["email"]
    pseudo = request.get_json()["pseudo"]
    password = request.get_json()["password"]
    confirmPassword = request.get_json()["confirmPassword"]

    # if this returns a user, then the email already exists in database
    user_mail = User.query.filter_by(email=email).first()
    if user_mail:
        return jsonify({"error" : "Cette adresse mail est déjà utilisé"}), 409 
    
    # if this returns a user, then the pseudo already exists in database
    user_pseudo = User.query.filter_by(pseudo=pseudo).first()
    if user_pseudo:
        return jsonify({"error" : "Ce pseudo est déjà utilisé"}), 409 
    
    #Checked password
    if len(password) < 8:
        return jsonify({"error" : "Votre mot de passe doit contenir au moins 8 caracètres"}), 400

    if password != confirmPassword:
        return jsonify({"error" : "Les mots de passes de corresponde pas."}), 400
    
    #TODO : vérifier s'il y a caratreès, lettre et chiffre ?

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, pseudo=pseudo, password=generate_password_hash(password, method='pbkdf2:sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Utilisateur créé avec succès",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "pseudo": new_user.pseudo
        }
    }), 201


@auth.route('/logout')
def logout():
    return 'Logout'