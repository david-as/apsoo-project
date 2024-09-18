from datetime import datetime

class Pedido:
    def __init__(self, id, valor, status='pendente', created=None):  # Remover a lógica de preenchimento
        self.id = id
        self.valor = valor
        self.status = status
        self.created = created  # Mantém o campo, mas não preenche automaticamente
