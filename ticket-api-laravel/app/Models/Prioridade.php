<?php

namespace App\Models;

use App\Models\Categoria;
use App\Models\SubCategoria;
use Illuminate\Database\Eloquent\Model;

class Prioridade extends Model
{
    public function categoriaPrioridade()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function subCategoriaPrioridade()
    {
        return $this->belongsTo(SubCategoria::class);
    }
}
