<?php

namespace App\Repositories;

use App\Models\Grupo;
use App\Repositories\Base\BaseRepository;

class GrupoRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Grupo::class;
    }
}
