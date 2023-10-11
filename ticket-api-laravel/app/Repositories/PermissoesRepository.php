<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Permissoes;
use App\Repositories\Base\BaseRepository;

class PermissoesRepository extends BaseRepository
{
    /**
     * @var Permissoes
     */
    protected $model;
    public function __construct()
    {
        $this->model = Permissoes::class;
    }

    public function atualizarPermissoes($usuario_id, $dados)
    {
        $permissoes = $this->model::firstOrNew([
            'usuario_id' => $usuario_id,
            'area_id' => $dados['area_id']
        ]);
        $permissoes->fill($dados);
        $permissoes->save();
        return $permissoes;
    }

    public function obterPorUsuario (User $usuario)
    {
        return $this->model::where('usuario_id', $usuario->id)->first();
    }

}
