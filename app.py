import os

from flask import Flask, render_template, send_from_directory
app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 
        'ico/favicon.ico')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route("/search")
def search():
    return render_template('search.html')

@app.route("/dash")
def dash():
    return render_template('dash.html')

@app.route("/")
def index():
    return render_template('index.html')
	
@app.route("/input")
def input():
    return render_template('input.html')

if __name__ == "__main__":
    app.run()