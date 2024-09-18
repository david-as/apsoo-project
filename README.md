# Projeto de Arquitetura APP_delivery/Microsserviços
**Versão:** 1.0  
**Data:** 17/09/2024  
**Equipe:**  
- **Nome:** [Seu Nome]  
- **E-mail:** [Seu E-mail]  

## Histórico de Revisões
| Data       | Versão | Descrição                | Responsáveis  |
|------------|--------|--------------------------|--------------|
| 17/09/2024 | 1.0    | Versão inicial do documento | [Seu Nome]   |

## 1. Introdução

### 1.1 Objetivo
Este documento apresenta a arquitetura do projeto baseado em microsserviços desenvolvido para a disciplina de Análise e Projeto de Sistemas Orientados a Objetos. O projeto visa integrar diferentes serviços que realizam operações como gerenciamento de usuários, realização de pedidos e geração de pagamentos. A arquitetura foi projetada para ser modular, escalável e compatível com práticas modernas de desenvolvimento, utilizando containers e orquestração de serviços.

### 1.2 Estrutura do Documento
- **Seção 1:** Introdução com visão geral do projeto e objetivo.
- **Seção 2:** Descrição detalhada dos microsserviços implementados e a arquitetura utilizada.
- **Seção 3:** Detalhamento da implementação, ferramentas utilizadas, e infraestrutura necessária.
- **Seção 4:** Arquivo README para execução do projeto.

## 2. Arquitetura de Serviços

### 2.1 Serviços Implementados
O projeto é composto por cinco microsserviços principais que realizam operações independentes e comunicam-se entre si:

- **Useresque:**
  - **Função:** Gerenciamento de usuários e restaurantes.
  - **Implementação:** Nest.js.
  - **Comunicação:** REST API.
  
- **Realizar Pedido:**
  - **Função:** Processar pedidos de clientes.
  - **Implementação:** Flask (Python).
  - **Comunicação:** REST API com outros serviços.
  
- **Gerar Pagamento:**
  - **Função:** Processar pagamentos utilizando a API do Mercado Pago.
  - **Implementação:** Flask (Python).
  - **Comunicação:** Externa via API do Mercado Pago.
  
- **Listar Pedidos:**
  - **Função:** Listar pedidos realizados no sistema.
  - **Implementação:** Flask (Python).
  - **Comunicação:** Interna via REST API.
  
- **API Gateway e Service Discovery:**
  - **Função:** Roteamento e descoberta de serviços.
  - **Implementação:** Kong.
  - **Comunicação:** Redireciona chamadas para os microsserviços.

### 2.2 Padrão de Arquitetura e Tecnologias
- **Arquitetura:** MVC e REST
- **Front-End:** Implementado com Next.js usando CSS, JavaScript e TypeScript, hospedado no Netlify.
- **Back-End:** Implementado com Nest.js (Useresque), Flask (Realizar Pedido, Gerar Pagamento, Listar Pedidos), hospedado no Azure.
- **Banco de Dados:** PostgreSQL.
- **API Gateway e Service Discovery:** Kong.
- **Orquestração de Containers:** Utilizado Docker Compose.
- **Comunicação Externa:** Integração com a API do Mercado Pago para processar pagamentos.

#### 2.2.1 Documentação da API do Mercado Pago
A API de pagamento utilizada neste projeto se baseia na documentação oficial do Mercado Pago. Para mais informações sobre a configuração e uso da API para criação de preferências de pagamento, consulte a documentação oficial [aqui](https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post).

A integração deste projeto segue as orientações fornecidas nesta documentação, utilizando a rota de criação de preferências para gerenciar os pagamentos via cartão de crédito.

## 3. Implementação

### 3.1 Microsserviços e Persistência de Dados
Cada microsserviço implementado possui controle de dados e persistência. O banco de dados PostgreSQL é utilizado para armazenamento de dados, enquanto os serviços são orquestrados com Docker Compose. A comunicação entre os microsserviços é feita via REST API.

### 3.2 Infraestrutura
Todos os microsserviços são executados em containers Docker, e a orquestração é realizada via Docker Compose. O projeto é distribuído da seguinte maneira:

- **Back-End:** Publicado no Azure.
- **Front-End:** Publicado no Netlify.

### 3.3 Comunicação Externa
O microsserviço de pagamento é responsável por se comunicar com a API externa do Mercado Pago para processar transações com cartão de crédito, gerando respostas de aprovação ou negação para o serviço de pedidos.

## 4. README - Instruções para Execução

### Pré-requisitos
Certifique-se de que você tem as seguintes ferramentas instaladas:
- Docker e Docker Compose
- Git para clonar o repositório

### Instruções para Execução

   git clone [link-do-repositorio]
   cd [nome-do-repositorio]

Crie as imagens Docker e execute os containers:
docker-compose up --build
Para acessar os serviços, utilize as URLs configuradas no Kong API Gateway (substitua <localhost> pelo endereço IP configurado, se necessário):

- Useresque (Usuários e Restaurantes): http://localhost:8000/useresque
- Realizar Pedido: http://localhost:8000/realizar-pedido
- Gerar Pagamento: http://localhost:8000/gerar-pagamento
- Listar Pedidos: http://localhost:8000/listar-pedidos

### Frontend:
O frontend está disponível no Netlify, acessível através do link fornecido pelo time de desenvolvimento.

### Estrutura do Projeto

/Projeto-Microsservicos/

├── backend/

│   ├── useresque/ (Nest.js)

│   ├── realizar-pedido/ (Flask)

│   ├── gerar-pagamento/ (Flask)

│   ├── listar-pedidos/ (Flask)

├── frontend/ (Next.js)

├── kong/ (API Gateway e Service Discovery)

├── docker-compose.yml

├── README.md


### Observações
As variáveis de ambiente sensíveis, como credenciais da API do Mercado Pago, devem ser configuradas no arquivo .env antes de executar o projeto.







