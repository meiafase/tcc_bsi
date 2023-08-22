<?php

namespace App\Models;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Model;

class Historico extends Model
{
    protected $table = 'historicos';

    protected $guarded = ["id"];

    public function usuarioHistorico()
    {
        return $this->hasOne(Usuario::class, "id", "usuario_id");
    }
}
