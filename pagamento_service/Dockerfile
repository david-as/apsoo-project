# Use a imagem base do Python 3.11
FROM python:3.11

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instale as dependências a partir do arquivo requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Defina a variável de ambiente para garantir que o Flask rode em modo de produção
ENV FLASK_ENV=production

# Execute os testes com pytest
RUN pytest tests/

# Exponha a porta que o Flask usará
EXPOSE 5000

# Comando para iniciar o serviço Flask
CMD ["python", "main.py"]
