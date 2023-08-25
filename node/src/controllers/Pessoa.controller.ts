import { PessoaRepository } from "../data/Pessoa.repository";
import { Request, Response } from 'express';
import { Pessoa } from "../models/Pessoa.model";
import { RabbitMQService } from "../services/Rabbitmq.services";

const repositoryPessoa = new PessoaRepository();
const service = new RabbitMQService();

export class PessoaController {
   
    async cadastrar(request: Request, response: Response) {
        let { nome, email, area_id, tp_coord, coord_id } = request.body;
        let pessoa: Pessoa = { nome, email, area_id, tp_coord, coord_id }
        const result = await repositoryPessoa.incluir(pessoa);

        service.enviar(JSON.stringify(pessoa));

        return response.json({ status: result.status, content: result.content })

    }
}
