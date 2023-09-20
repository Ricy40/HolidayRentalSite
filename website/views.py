import os
import re
import smtplib
import phonenumbers
import json

from flask import Blueprint, render_template, request, flash
from .models import User, Review, Event
from .initAdmin import getAdmin
from . import initAdmin, db

from flask_login import current_user, login_user, logout_user
from werkzeug.security import check_password_hash
from email_validator import validate_email, EmailNotValidError
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


views = Blueprint('views', __name__)

def getReviews():
    reviews = Review.query.all()
    return reviews

def checkEmail(email):
    try:
        v = validate_email(email)
        email = v["email"]
        return True
    except EmailNotValidError as e:
        flash(str(e), category='error')
        return False

def checkPhone(number):
    if carrier._is_mobile(number_type(phonenumbers.parse(number))):
        return True
    else:
        return False

def checkDateFormat(date):
    pattern = "^\d\d\/\d\d\/\d\d$"
    if re.match(pattern, date):
        return True
    else:
        return False

def getEvents():
    events = Event.query.all()
    return events

@views.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        if 'submit-login' in request.form:
            if request.form.get('username') == getAdmin().username:
                if check_password_hash(getAdmin().password, request.form.get("password")):
                    flash("Login successful", category='success')
                    login_user(getAdmin(), remember=True)
            else:
                flash("Incorrect username or password!", category='error')

        if 'submit-review' in request.form:

            user = request.form.get('review-name')
            description = request.form.get('review-description')
            rating = request.form.get('stars')
            email = request.form.get('review-email')
            title = request.form.get('review-title')

            if rating == None:
                flash("You must choose a rating!", category='error')
            elif not checkEmail(email):
                pass
            elif len(description) < 10:
                flash("Your review must be at least 10 characters long!", category='error')
            elif len(title) < 1:
                flash("Your title must be at least 1 characters long!", category='error')
            elif len(user) < 1:
                flash("Your name must be at least 1 characters long!", category='error')
            else:
                review = Review(user=user, description=description, rating=rating, email=email, title=title)
                db.session.add(review)
                db.session.commit()
                flash("Review successfully submitted and under validation.", category='succes')

        if 'submit-logout' in request.form:
            logout_user()
            flash("Logout successful", category='success')

        if 'submit-review-approval' in request.form:
            reviewID = request.form.get('submit-review-approval')
            review = Review.query.filter_by(id=reviewID).first()
            review.verified = True
            db.session.commit()

        if 'submit-review-delete' in request.form:
            reviewID = request.form.get('submit-review-delete')
            review = Review.query.filter_by(id=reviewID).first()
            db.session.delete(review)
            db.session.commit()

        if 'submit-message' in request.form:

            name = request.form.get('message-name')
            email = request.form.get('message-email')
            arrival = request.form.get('message-arrival')
            departure = request.form.get('message-departure')
            phone = request.form.get('message-phone')
            message = request.form.get('message-message')

            if not checkEmail(email):
                pass
            elif len(name) < 1:
                flash("Please use your real name", category='error')
            elif not checkPhone(phone):
                flash("Please enter a valid phone number with country code, e.g. +44 1234 123456", category='error')
            elif len(message) < 10:
                flash("Please enter a message longer than 10 characters", category='error')
            elif not checkDateFormat(arrival):
                flash("Please enter a valid arrival date", category='error')
            elif not checkDateFormat(departure):
                flash("Please enter a valid departure date", category='error')
            else:
                msg = MIMEMultipart()
                msg['From'] = os.environ.get("email")
                msg['To'] = os.environ.get("email")
                msg['Subject'] = "New Message from " + email + " via Mas de Barras Website."
                message = f"Email: {email}\nPhone Number: {phone}\n\nArrival Date: {arrival}\nDeparture Date: {departure}\n\nMessage: {message}\n\nFrom,\n{name}"
                msg.attach(MIMEText(message))

                server = smtplib.SMTP("smtp-mail.outlook.com", 587)
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(os.environ.get("email"), os.environ.get("password"))
                server.sendmail(os.environ.get("email"), os.environ.get("email"), msg.as_string())

                flash("Message sent!", category='success')

    return render_template("/index.html", user=current_user, reviews=getReviews())

@views.route('/calendar', methods=['POST'])
def calendar():
    data = request.form['startDates']
    print(data)
    data = eval(data)
    print(data)

    Event.query.delete()

    for i in data:
        print(i)
        event = Event(value=i)
        db.session.add(event)
    db.session.commit()
    print("COMMITED DATA!")
    return "OK"

@views.route('/process', methods=['POST'])
def process():
    events = getEvents()
    eventsString = ', '.join(str(event.value) for event in events)
    print(eventsString)
    return eventsString

