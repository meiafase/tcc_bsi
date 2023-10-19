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
}
