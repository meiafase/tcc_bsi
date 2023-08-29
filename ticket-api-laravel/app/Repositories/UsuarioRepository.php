<?php

namespace App\Repositories;

use App\Repositories\Base\BaseRepository;
use App\Models\Usuario;

class UsuarioRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Usuario::class;
    }
}
