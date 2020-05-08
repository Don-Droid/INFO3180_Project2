import os
import datetime
from app import app
from flask import render_template, request, session, flash, url_for
from werkzeug.utils import secure_filename
from .forms import RegisterForm, LoginForm
from flask import jsonify, json

from flask_login import login_user, logout_user, current_user, login_required

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')

def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


@app.route("/logout")
@login_required
def logouts():
    # Logout the user and end the session
    logout_user()
    flash('You have been logged out.', 'danger')
    return

@app.route('/api/users/register', methods = ['POST'])
def register():
    form = RegisterForm()
    if request.method == "POST" and form.validate_on_submit():
        uname = form.uname.data
        pword = form.pword.data
        fname = form.fname.data
        lname = form.lname.data
        email = form.email.data
        location = form.location.data
        bio = form.bio.data
        photo = form.photo.data
        date = datetime.datetime.now()
        date = date.strftime("%d %b %Y")

        filename = secure_filename(photo.filename)
        photo.save(os.path.join(
            app.config['UPLOAD_FOLDER'], filename))

        register = [{"message": "Registered Successfully"},
                   {"filename": uname},
                    {"Password":pword},
                    {"firstname":fname},
                    {"lastname":lname},
                    {"email":email},
                    {"location":location},
                    {"bio":bio},
                    {"photo":filename},
                    {"Date":date}]
    
        return jsonify(register = register)
    return jsonify(form_errors(form))
    

@app.route('/api/auth/login', methods = ['POST'])
def login ():
    form = LoginForm()
    if request.method == "POST" and form.validate_on_submit():
        uname = form.uname.data
        pword = form.pword.data

        login = [{"message": "Login Successfully"},
                   {"filename": uname},
                    {"Password":pword}]
        
        return jsonify(login=login)
    return jsonify(form_errors(form))
        


@app.route('/api/auth/logout', methods = ['GET'])
def logout ():
    return

@app.route('/api/users/{user_id}/posts', methods = ['POST'])
def post ():
    return

@app.route('/api/users/{user_id}/posts', methods = ['GET'])
def posts ():
    return

@app.route('/api/users/{user_id}/follow', methods = ['POST'])
def follow ():
    return

@app.route('/api/posts', methods = ['GET'])
def all_post ():
    return

@app.route('/api/posts/{post_id}/like', methods = ['POST'])
def like ():
    return


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to tell browser not to cache the rendered page.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")

