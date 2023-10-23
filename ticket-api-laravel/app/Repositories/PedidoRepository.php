<?php

namespace App\Repositories;

use App\Models\Pedido;
use App\Repositories\Base\BaseRepository;
use Illuminate\Support\Facades\DB;


class PedidoRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Pedido::class;
    }

    public function proximoResponsavelGrupo($grupo_id)
    {
        return collect(DB::select(
            "SELECT GI.usuario_id,
            GI.ultima_atribuicao
            FROM
                grupos_integrantes AS GI
                INNER JOIN users US ON US.id = GI.usuario_id
                INNER JOIN permissoes AS PER ON PER.usuario_id = GI.usuario_id
            WHERE
                GI.grupo_id = {$grupo_id}
                AND GI.status = TRUE
                AND US.status = TRUE
                AND PER.atender_chamados = TRUE
            ORDER BY
                ultima_atribuicao ASC
                LIMIT 1"
        ))->first();
    }

    public function marcarAtribuicaoRodizio($usuario_id, $grupo_id, $data)
    {
        return DB::table('grupos_integrantes')
            ->where('grupo_id', $grupo_id)
            ->where('usuario_id', $usuario_id)
            ->update(['ultima_atribuicao' => $data]);
    }

    public function filtrarRespSolic($dados)
    {
        return collect(DB::select(
            "SELECT
            DISTINCT(ped.". $dados['variavel'] ."_id) id,
            " . $dados['variavel'] . ".name,
            " . $dados['variavel'] . ".area_id
        FROM
            pedidos ped
            JOIN users responsavel ON ped.responsavel_id = responsavel.id
	        JOIN users solicitante ON ped.solicitante_id = solicitante.id
        WHERE
            {$dados['filtro']}
        ORDER BY
            " . $dados['variavel'] . ".name;"
        ));
    }

    public function filtrarListagem($dados)
    {
        $ordenacao = "ped.created_at DESC;";

        //Minhas solicitaçoes
        if ($dados['tipo'] == 'minhas') {
            $condicao = ["ped.solicitante_id = ". $dados['usuario']->id];
        }

        //Meus atendimentos
        if ($dados['tipo'] == 'atendimentos') {
            $condicao = ["ped.responsavel_id = " . $dados['usuario']->id];
        }

        //Minha area
        if ($dados['tipo'] == 'area') {
            $condicao = ["ped.area_id = " . $dados['usuario']->area_id];
        }

        // Status
        if(@$dados['status_id']) {
            $condicao = array_merge($condicao, ["AND ped.status_id = " . $dados['status_id']]);
        } else {
            $condicao = array_merge($condicao, ["AND ped.status_id in (1, 2, 3, 4, 5)"]);
        }

        //Solicitante
        if(@$dados['solicitante_id']) {
            $condicao = array_merge($condicao, ["AND ped.solicitante_id = " . $dados['solicitante_id']]);
        }

        //Responsavel
        if(@$dados['responsavel_id']) {
            $condicao = array_merge($condicao, ["AND ped.responsavel_id = " . $dados['responsavel_id']]);
        }

        //Area
         if(@$dados['area_id']) {
            $condicao = array_merge($condicao, ["AND solicitante.area_id = " . $dados['area_id']]);
        }

        //Prioridade
        if(@$dados['prioridade_id']) {
            $condicao = array_merge($condicao, ["AND ped.prioridade_id = " . $dados['prioridade_id']]);
        }

        $condicao = implode(" ", $condicao);
        $retorno['condicao'] = $condicao;
        $retorno['ordenacao'] = $ordenacao;

        // return $retorno;
        return $this->gerarListagem($retorno);
    }

    public function gerarListagem($dados)
    {
            return collect(DB::select(
            "SELECT
            ped.id,
            ped.created_at enviado_em,
            area_pedido.titulo area_pedido,
            solicitante.name solicitante,
            area_solicitante.titulo area_solicitante,
            responsavel.name responsavel,
            area_responsavel.titulo area_responsavel,
            assuntos.titulo assunto,
            categorias.titulo categoria,
            sub_categorias.titulo sub_categoria,
            `status`.descricao status,
            ped.prazo_limite prazo,
            ped.fim_atendimento
        FROM
            pedidos ped
            JOIN users solicitante ON ped.solicitante_id = solicitante.id
            LEFT JOIN users responsavel ON ped.responsavel_id = responsavel.id
            JOIN `status` ON ped.status_id = `status`.id
            JOIN areas area_pedido ON ped.area_id = area_pedido.id
            JOIN areas area_solicitante ON solicitante.area_id = area_solicitante.id
            LEFT JOIN areas area_responsavel ON responsavel.area_id = area_responsavel.id
            JOIN assuntos ON ped.assunto_id = assuntos.id
            JOIN categorias On ped.categoria_id = categorias.id
            LEFT JOIN sub_categorias On ped.sub_categoria_id = sub_categorias.id
        WHERE
            {$dados['condicao']}
        ORDER BY
            {$dados['ordenacao']}
            "
        ));
    }
}
