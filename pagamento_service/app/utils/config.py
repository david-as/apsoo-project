import os
from dotenv import load_dotenv

# Carregando variáveis de ambiente
load_dotenv()

MERCADO_PAGO_TOKEN = os.getenv("MERCADO_PAGO_ACCESS_TOKEN")
