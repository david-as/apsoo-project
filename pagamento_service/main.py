from flask import Flask
from app.routes import routes

app = Flask(__name__)

# Registrando as rotas
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
