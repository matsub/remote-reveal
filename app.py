#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import bottle
from bottle import (
    jinja2_template as template,
    static_file,
)


app = bottle.Bottle()


@app.route('/')
def index():
    return template('index.html')


@app.route('/statics/<filepath:path>')
def statics(filepath):
    return static_file(filepath, root='statics')


if __name__ == '__main__':
    app.run(port=8080, reloader=True, debug=True)
