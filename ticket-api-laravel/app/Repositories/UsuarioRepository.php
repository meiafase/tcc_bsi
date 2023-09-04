<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Base\BaseRepository;

class UsuarioRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = User::class;
    }

    public function listarEquipe(int $id)
    {
        $retorno = $this->model::where('coord_id', $id)
        ->where('status', '1')
        ->with('permissoes')
        ->orderBy('name', 'ASC')
        ->get()
        ->toArray();
        return $retorno;
    }
}
