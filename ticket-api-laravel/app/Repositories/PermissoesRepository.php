<?php

namespace App\Repositories;

use App\Models\Usuario;
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

}
