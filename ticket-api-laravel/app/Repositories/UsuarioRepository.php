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
}
