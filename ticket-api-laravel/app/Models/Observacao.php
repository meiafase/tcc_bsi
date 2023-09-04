<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Observacao extends Model
{
    protected $table = 'observacoes';
    protected $guarded = ["id"];

    public function usuario()
    {
        return $this->hasOne(User::class, "id", "usuario_id")->select("id", "nome", "email");
    }
}
