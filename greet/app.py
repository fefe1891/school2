from flask import Flask, request
import re

app = Flask(__name__)


@app.route('/welcome')
def welcome():
    return "Welcome to my homepage!"


@app.route('/welcome/home')
def welcome_home():
    return "Welcome home!"


@app.route('/welcome/back')
def welcome_back():
    return "Welcome back!"