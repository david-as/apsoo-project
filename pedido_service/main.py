from flask import Flask
from controllers.pedido_controller import pedido_bp
from models.collection_pedido import PedidoCollection
from models.pedido import Pedido

app = Flask(__name__)
app.register_blueprint(pedido_bp)

if __name__ == "__main__":  # Registra o serviço antes de iniciar o servidor
    app.run(host='0.0.0.0', port=5000)
