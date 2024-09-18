import mercadopago
import logging
from flask import jsonify, request
from app.utils.config import MERCADO_PAGO_TOKEN

# Configurar o logger
logging.basicConfig(level=logging.INFO)
sdk = mercadopago.SDK(MERCADO_PAGO_TOKEN)

def gerar_pagamento(payment_data):
    try:
        # Geração da preferência de pagamento
        result = sdk.preference().create(payment_data)
        payment = result.get("response", {})
        print(payment)
        
        if not payment:
            raise Exception("Erro ao criar a preferência de pagamento.")
        
        link_iniciar_pagamento = payment.get("init_point")
        logging.info(f"Link de pagamento gerado: {link_iniciar_pagamento}")
        
        return jsonify({"link_pagamento": link_iniciar_pagamento})
    except Exception as e:
        logging.error(f"Erro ao gerar o pagamento: {e}")
        return jsonify({"error": "Erro ao processar pagamento."}), 500

    
