import { Router } from 'express';
import { PessoaController } from '../controllers/Pessoa.controller';
// import { EnderecoController } from '../controllers/Endereco.controller';

const router: Router = Router();


/**
 * @swagger
 * /newPessoa:
 *   post:
 *     description: Cadastrar uma pessoa
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Pessoa cadastrada com sucesso
 */
router.post('/newPessoa', new PessoaController().cadastrar);

export { router }