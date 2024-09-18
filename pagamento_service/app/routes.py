from flask import Blueprint, request, jsonify
from app.services.mercadopago_service import gerar_pagamento

routes = Blueprint('routes', __name__)

@routes.route('/gerar_pagamento', methods=['POST'])
def gerar_pagamento_route():
    try:
        payment_data = request.get_json()  # Recebe o JSON com os dados do pagamento
        if not payment_data:
            return jsonify({"error": "Dados de pagamento são necessários."}), 400
        
        return gerar_pagamento(payment_data)
    except Exception as e:
        return jsonify({"error": f"Erro ao processar solicitação: {e}"}), 500


