<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;
use App\Models\SubCategoria;

class Adicional extends Model
{
    protected $table = 'adicionais';

    protected $guarded = ["id"];

    protected $visible = ["id", "titulo"];

    public function categoriaAdicionais()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function subCategoriaAdicionais()
    {
        return $this->belongsTo(SubCategoria::class);
    }
    public function setTituloAttribute($value)
    {
        $this->attributes['titulo'] = ucfirst($value);
    }
}
