<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Historico extends Model
{
    protected $table = 'historicos';

    protected $guarded = ["id"];

    public function usuario()
    {
        return $this->hasOne(User::class, "id", "usuario_id");
    }
}
