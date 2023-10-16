<?php

namespace App\Repositories;

use App\Models\Historico;
use App\Repositories\Base\BaseRepository;

class HistoricoRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Historico::class;
    }

    public function buscar($pedido_id)
    {
        $historico = $this->model::where('pedido_id', $pedido_id);
        return $historico->with('usuarioHistorico')->get();
    }
}
