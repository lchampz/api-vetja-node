# API Veterinária

API RESTful para gerenciamento de clínica veterinária, desenvolvida com Node.js, Express, TypeScript e Prisma.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT para autenticação
- bcrypt para criptografia

## 📁 Estrutura de Pastas

```
src/
├── Controllers/     # Controladores da aplicação
├── Models/         # Modelos e lógica de negócio
├── Routes/         # Definição das rotas
├── DTOs/           # Data Transfer Objects e interfaces
├── Types/          # Tipos TypeScript
└── server.ts       # Arquivo principal da aplicação
```

## 🛠️ Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

5. Inicie o servidor
```bash
npm run dev
```

## 📚 Entidades

### Cliente
- IDCliente (string)
- nome (string)
- email (string)
- senha (string)
- telefone (string)
- cpf (string)

### Animal
- idAnimal (string)
- nome (string)
- raca (string)
- idade (number)
- IDCliente (string)

### Veterinário
- idVeterinario (string)
- nome (string)
- crmv (string)
- email (string)
- telefone (string)

### Endereço
- idEndereco (string)
- rua (string)
- numero (number)
- bairro (string)
- cidade (string)
- estado (string)
- cep (string)
- IDCliente (string)

### Especialidade
- idEspecialidade (string)
- nome (string)

### VeterinárioEspecialidade
- idVeterinarioEspecialidade (string)
- idVeterinario (string)
- idEspecialidade (string)

## 🔌 Endpoints da API

### Autenticação

#### Cadastro de Usuário
```http
POST /auth/signup
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "cpf": "12345678900",
  "telefone": "11999999999"
}
```

#### Login
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

### Clientes

#### Listar Todos os Clientes
```http
GET /users
Authorization: Bearer {token}
```

#### Obter Cliente por ID
```http
GET /users/{id}
Authorization: Bearer {token}
```

#### Atualizar Cliente
```http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "telefone": "11988888888"
}
```

#### Deletar Cliente
```http
DELETE /users/{id}
Authorization: Bearer {token}
```

### Animais

#### Listar Todos os Animais
```http
GET /animals
Authorization: Bearer {token}
```

#### Obter Animal por ID
```http
GET /animals/{id}
Authorization: Bearer {token}
```

#### Criar Animal
```http
POST /animals
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Rex",
  "raca": "Labrador",
  "idade": 3
}
```

#### Atualizar Animal
```http
PUT /animals/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Rex Atualizado",
  "raca": "Labrador",
  "idade": 4
}
```

#### Deletar Animal
```http
DELETE /animals/{id}
Authorization: Bearer {token}
```

### Veterinários

#### Listar Todos os Veterinários
```http
GET /veterinarios
Authorization: Bearer {token}
```

#### Obter Veterinário por ID
```http
GET /veterinarios/{id}
Authorization: Bearer {token}
```

#### Criar Veterinário
```http
POST /veterinarios
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Dr. Carlos",
  "crmv": "12345",
  "email": "carlos@vet.com",
  "telefone": "11977777777"
}
```

#### Atualizar Veterinário
```http
PUT /veterinarios/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Dr. Carlos Silva",
  "crmv": "12345",
  "email": "carlos.silva@vet.com",
  "telefone": "11966666666"
}
```

#### Deletar Veterinário
```http
DELETE /veterinarios/{id}
Authorization: Bearer {token}
```

### Endereços

#### Listar Todos os Endereços
```http
GET /enderecos
Authorization: Bearer {token}
```

#### Obter Endereço por ID
```http
GET /enderecos/{id}
Authorization: Bearer {token}
```

#### Criar Endereço
```http
POST /enderecos
Authorization: Bearer {token}
Content-Type: application/json

{
  "rua": "Rua das Flores",
  "numero": 123,
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234567"
}
```

#### Atualizar Endereço
```http
PUT /enderecos/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "rua": "Rua das Flores",
  "numero": 124,
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234567"
}
```

#### Deletar Endereço
```http
DELETE /enderecos/{id}
Authorization: Bearer {token}
```

### Especialidades

#### Listar Todas as Especialidades
```http
GET /especialidades
Authorization: Bearer {token}
```

#### Obter Especialidade por ID
```http
GET /especialidades/{id}
Authorization: Bearer {token}
```

#### Criar Especialidade
```http
POST /especialidades
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Clínico Geral"
}
```

#### Atualizar Especialidade
```http
PUT /especialidades/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Clínico Geral Veterinário"
}
```

#### Deletar Especialidade
```http
DELETE /especialidades/{id}
Authorization: Bearer {token}
```

## 🔒 Autenticação

Todas as rotas (exceto login e cadastro) requerem autenticação via token JWT. O token deve ser enviado no header da requisição:

```http
Authorization: Bearer {token}
```

## ⚠️ Observações

- Todas as requisições devem incluir o header `Content-Type: application/json`
- Respostas de erro seguem o formato: `{ msg: "Mensagem de erro" }`
- IDs são gerados automaticamente pelo sistema
- Todas as datas são retornadas em formato ISO 8601 