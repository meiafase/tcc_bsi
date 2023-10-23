<?php

namespace App\Repositories;

use App\Models\Prioridade;
use App\Repositories\Base\BaseRepository;

class PrioridadeRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Prioridade::class;
    }
}
