from flask import Blueprint, request, jsonify
from models.collection_pedido import PedidoCollection
from models.pedido import Pedido
import requests

pedido_bp = Blueprint('pedido', __name__)
collection = PedidoCollection()

@pedido_bp.route('/criar_pedido', methods=['POST'])
def criar_pedido():
    data = request.json
    novo_pedido = Pedido(None, data['valor'], data.get('status', 'pendente'))  # Permite definir o status
    collection.insert(novo_pedido)
    return jsonify({"message": "Pedido criado com sucesso!"}), 201

@pedido_bp.route('/listar_pedidos', methods=['GET'])
def listar_pedidos():
    pedidos = collection.get_all()
    return jsonify([{
        "id": pedido.id,
        "valor": pedido.valor,
        "status": pedido.status,
        "created": pedido.created  
    } for pedido in pedidos]), 200

@pedido_bp.route('/get_pedido/<int:id>', methods=['GET'])  # Atualiza o endpoint para /pedido/<id>
def listar_pedido(id):
    pedido = collection.get(id)
    if pedido:
        return jsonify({
            "id": pedido.id,
            "valor": pedido.valor,
            "status": pedido.status,
            "created": pedido.created
        }), 200
    return jsonify({"message": "Pedido não encontrado!"}), 404

@pedido_bp.route('/realizar_pagamento', methods=['POST'])  # Nova rota para realizar pagamento
def realizar_pagamento():
    data_request = request.json  # Obtém os dados do corpo da requisição
    data = {
        "items": [
            {
                "id": "123",
                "title": data_request['title'],  # Obtém o título do corpo da requisição
                "quantity": data_request['quantity'],  # Obtém a quantidade do corpo da requisição
                "currency_id": "BRL",
                "unit_price": 1.00
            }
        ],
        "back_urls": {
            "success": data_request['back_url'],
            "failure": data_request['back_url'],
            "pending": data_request['back_url']
        },
        "auto_return": "all"
    }
    
    response = requests.post('http://kong:8000/pagamento/gerar_pagamento', json=data)  # Chama a API de pagamento
    return jsonify(response.json()), response.status_code  # Retorna a resposta da API

@pedido_bp.route('/atualizar_pedido/<int:id>', methods=['PUT'])
def atualizar_pedido(id):
    data = request.json  # Obtém os dados do corpo da requisição
    pedido = collection.get(id)
    if pedido:
        pedido.status = data.get('status', pedido.status)  # Atualiza o status se fornecido
        collection.update(pedido)  # Atualiza o pedido na coleção
        return jsonify({"message": "Pedido atualizado com sucesso!"}), 200
    return jsonify({"message": "Pedido não encontrado!"}), 404