<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Assunto;
use App\Models\Pedido;
use App\Models\Grupo;

class Area extends Model
{
    protected $table = "areas";
    protected $guarded = ["id"];

    public function assuntos()
    {
        return $this->hasMany(Assunto::class, "area_id", "id");
    }

    public function grupos()
    {
        return $this->hasMany(Grupo::class, "area_id", "id");
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, "area_id", "id");
    }
}
