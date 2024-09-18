import pytest
import requests_mock
from flask import Flask
from app.routes import routes  # Certifique-se de importar o blueprint corretamente

@pytest.fixture
def app():
    # Configura a aplicação Flask para os testes e registra o blueprint
    app = Flask(__name__)
    app.register_blueprint(routes)  # Registrar o blueprint de rotas
    return app

@pytest.fixture
def client(app):
    # Retorna o cliente de testes do Flask
    return app.test_client()

@pytest.fixture
def payment_data():
    # Dados de teste para o pagamento
    return {
        "items": [
            {
                "title": "Produto Teste",
                "quantity": 1,
                "unit_price": 100.0
            }
        ],
        "payer": {
            "email": "test@example.com"
        }
    }

# Teste de sucesso para a rota gerar_pagamento
def test_gerar_pagamento_route_sucesso(client, payment_data):
    with requests_mock.Mocker() as m:
        # Mockando a resposta da API do Mercado Pago
        m.post('https://api.mercadopago.com/checkout/preferences', json={
            "init_point": "https://www.mercadopago.com/link-teste"
        })

        # Fazendo uma requisição POST para a rota /gerar_pagamento
        response = client.post('/gerar_pagamento', json=payment_data)
        data = response.get_json()

        # Verificações
        assert response.status_code == 200
        assert "link_pagamento" in data
        assert data["link_pagamento"] == "https://www.mercadopago.com/link-teste"

# Teste de falha para a rota gerar_pagamento (dados ausentes)
def test_gerar_pagamento_route_dados_ausentes(client):
    # Fazendo uma requisição POST para a rota /gerar_pagamento sem dados
    response = client.post('/gerar_pagamento', json={})
    data = response.get_json()

    # Verificações
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Dados de pagamento são necessários."

# Teste de falha com erro na API do Mercado Pago
def test_gerar_pagamento_route_erro_api(client, payment_data):
    with requests_mock.Mocker() as m:
        # Mockando uma resposta inválida da API
        m.post('https://api.mercadopago.com/checkout/preferences', json={})
        
        # Fazendo uma requisição POST para a rota /gerar_pagamento
        response = client.post('/gerar_pagamento', json=payment_data)
        data = response.get_json()

        # Verificações
        assert response.status_code == 500
        assert "error" in data
        assert data["error"] == "Erro ao processar pagamento."
