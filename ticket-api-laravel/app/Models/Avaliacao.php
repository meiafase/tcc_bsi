<?php

namespace App\Models;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    protected $table = 'avaliacoes';

    protected $guarded = ["id"];

    protected $casts = [
        'nota' => 'float'
    ];

    public function usuario()
    {
        return $this->hasOne(Usuario::class, "id", "usuario_id")->select("id", "nome", "email");
    }
}
