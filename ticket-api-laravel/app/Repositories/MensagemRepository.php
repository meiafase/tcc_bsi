<?php

namespace App\Repositories;

use App\Models\Mensagem;
use App\Repositories\Base\BaseRepository;

class MensagemRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Mensagem::class;
    }
}
