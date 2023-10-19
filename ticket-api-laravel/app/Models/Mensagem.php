<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Mensagem extends Model
{
    protected $table = 'mensagens';
    protected $guarded = ["id"];

    public function anexos()
    {
        return $this->hasMany(Anexo::class, "mensagem_id", "id");
    }

    public function usuario()
    {
        return $this->hasOne(User::class, "id", "usuario_id")->select("id", "name", "email");
    }
}
