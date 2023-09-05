<?php

namespace App\Models;

use App\Models\Area;
use App\Models\User;
use App\Pivots\GrupoIntegrantesPivot;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = "grupos";
    protected $guarded = ["id"];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function area()
    {
        return $this->belongsTo(Area::class, "area_id", "id");
    }

    public function integrantes() {

        return $this->belongsToMany(User::class, "grupos_integrantes", "grupo_id", "usuario_id");
    }

    public function grupos_integrantes() {

        return $this->hasMany(new GrupoIntegrantesPivot, 'id', 'grupo_id');
    }

}
