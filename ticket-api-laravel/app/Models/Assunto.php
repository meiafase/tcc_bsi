<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Area;
use App\Models\Categoria;

class Assunto extends Model
{
    protected $table = 'assuntos';
    protected $guarded = ["id"];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    public function area()
    {
        return $this->belongsTo(Area::class, "area_id", "id");
    }

    public function categorias()
    {
        return $this->hasMany(Categoria::class);
    }

    public function setTituloAttribute($value)
    {
        $this->attributes['titulo'] = strtoupper($value);
    }
}
