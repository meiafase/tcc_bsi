<?php

namespace App\Repositories;

use App\Models\Avaliacao;
use App\Repositories\Base\BaseRepository;

class AvaliacaoRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Avaliacao::class;
    }
}
