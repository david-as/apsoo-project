import os
import psycopg2
from dotenv import load_dotenv
from models.pedido import Pedido

load_dotenv()  # Carrega variáveis de ambiente do arquivo .env

class PedidoRepository:
    def __init__(self):
        self.db_name = os.getenv('DATABASE_URL')  # Obtém a URL do banco de dados do ambiente
        self._create_table()

    def _get_connection(self):
        return psycopg2.connect(self.db_name)  # Conecta ao PostgreSQL

    def _create_table(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS pedidos (
                    id SERIAL PRIMARY KEY, 
                    valor REAL,
                    status TEXT DEFAULT 'pendente',
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Mantém a coluna created
                )
            ''')
            conn.commit()

    def insert(self, pedido):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO pedidos (valor, status) VALUES (%s, %s)', (pedido.valor, pedido.status))
            conn.commit()

    def remove(self, id):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM pedidos WHERE id = %s', (id,))
            conn.commit()

    def get_all(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM pedidos')
            rows = cursor.fetchall()
            return [Pedido(row[0], row[1], row[2], row[3]) for row in rows]  # Inclui o created

    def get(self, id):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM pedidos WHERE id = %s', (id,))
            row = cursor.fetchone()
            return Pedido(row[0], row[1], row[2], row[3]) if row else None  # Inclui o created

    def update(self, pedido):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('UPDATE pedidos SET valor = %s, status = %s WHERE id = %s', (pedido.valor, pedido.status, pedido.id))
            conn.commit()