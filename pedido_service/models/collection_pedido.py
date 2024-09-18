from models.pedido_repository import PedidoRepository  # Importa o repositório
from models.pedido import Pedido

class PedidoCollection:
    def __init__(self):
        self.repository = PedidoRepository()  # Instancia o repositório sem passar o nome do banco

    def insert(self, pedido):
        self.repository.insert(pedido)

    def remove(self, id):
        self.repository.remove(id)

    def get_all(self):
        return self.repository.get_all()  # Retorna uma lista de objetos Pedido

    def get(self, id):
        return self.repository.get(id)  # Retorna um objeto Pedido ou None

    def update(self, pedido):
        self.repository.update(pedido)

# Exemplo de uso
if __name__ == "__main__":
    collection = PedidoCollection()
    # Adicionar um pedido
    collection.insert(Pedido(None, 100.0))
    # Listar todos os pedidos
    print(collection.get_all())
