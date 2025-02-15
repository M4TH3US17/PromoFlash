## Executar aplicacao:
npm install
docker compose up --build

## Executar migrations:
npm run build
npx typeorm migration:run -d "dist\infrastructure\database\data-source.js"

## Acessar o PgAdmin:
http://localhost:5050/

## Acessar Documentacao:
http://localhost:4000/promoflash-doc