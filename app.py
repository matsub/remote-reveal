#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import bottle
from bottle import (
    jinja2_template as template,
    static_file,
    redirect,
    request,
    response,
)


app = bottle.Bottle()
SECRET_KEY = os.environ.get("RR_SECRET")
PASSWORD = os.environ.get("RR_PSWD")


def check_password(password):
    return password == PASSWORD


@app.get('/')
def index():
    logged = request.get_cookie("logged-in", secret=SECRET_KEY)
    if logged:
        return template('index.html')
    else:
        return template('login.html')


@app.post('/')
def login():
    password = request.forms.get('password')
    if check_password(password):
        response.set_cookie("logged-in", True, secret=SECRET_KEY)
        redirect('/')
    else:
        return template('login.html')


@app.route('/statics/<filepath:path>')
def statics(filepath):
    return static_file(filepath, root='statics')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
