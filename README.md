## 1 Executar aplicacao:
npm install
docker compose up --build

## 2 Executar migrations:
npm run build
npx typeorm migration:run -d "dist\infrastructure\database\data-source.js"

## 3 Acessar o PgAdmin:
http://localhost:5050/

# 3.1 Acessar o PgAdmin usando as variáveis que você colocou em:
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

# 3.2 Criar um novo banco de dados:
Criar com o valores das variáveis de ambiente: 

DB_HOST=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=

## 4 Acessar Documentacao:
http://localhost:4000/promoflash-doc