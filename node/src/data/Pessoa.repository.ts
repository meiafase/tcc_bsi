import { Pessoa } from './../models/Pessoa.model';
import PessoaModelTable from '../models/tables/Pessoa.models.tables';

let pessoas: Pessoa[] = [];

export class PessoaRepository {
    async incluir(pessoa: Pessoa) {
        const insert = await PessoaModelTable.create({
            name: pessoa.name,
            email: pessoa.email,
            area_id: pessoa.area_id,
            tp_coord: pessoa.tp_coord,
            coord_id: pessoa.coord_id,
        });

        if (insert) {
            return {
                status: 'ok',
                content: 'Pessoa cadastrada com sucesso!'
            }
        } else {
            return {
                status: 'error',
                content: 'Erro ao castrasdar essa pessoa!'
            }
        }
    }
}