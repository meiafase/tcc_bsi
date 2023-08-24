import express from 'express';
import { router } from './configs/Routes';
import swaggerUI from  'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import Pessoa from './models/tables/Pessoa.models.tables';

let swaggerDefinition = {
    info: {
        title: 'TSX Swagger',
        version: '1.0.00',
        description: 'Documentação da API Pessoas'
    }
}

let options = {
    swaggerDefinition: swaggerDefinition,
    apis: [`${__dirname}/configs/Routes.ts`],
}

let swaggerSpec = swaggerJsDoc(options);


const app = express();
const PORT = 3000;

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Aplicação PESSOAS rodando na porta ${PORT}`);
})