"""Handsfree Rummy Backend"""
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_message(data):
    print('received connect message: ' + str(data))

@socketio.on('join-game')
def on_join(data):
    print('received disconnect message: ' + str(data))

@socketio.on('create-game')
def on_create(data)
    print('received disconnect message: ' + str(data))
    emit('game-created', data)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=4000)