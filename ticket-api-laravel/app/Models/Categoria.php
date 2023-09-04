<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Assunto;
use App\Models\SubCategoria;
use App\Models\Prioridade;
use App\Models\Adicional;

class Categoria extends Model
{
    protected $table = 'categorias';

    protected $guarded = ["id"];

    protected $casts = [
        "ativo" => "boolean"
    ];

    protected $fillable = [
        "usuario_id",
        "assunto_id",
        "prioridade_id",
        "equipe_id",
        "responsavel_id",
        "titulo",
        "descricao",
        "possui_subcategorias",
        "restricao",
        "possui_adicionais",
        "prazo_horas",
        "ativo"
    ];

    public function assunto()
    {
        return $this->belongsTo(Assunto::class);
    }

    public function subCategorias()
    {
        return $this->hasMany(SubCategoria::class);
    }

    public function prioridade()
    {
        return $this->belongsTo(Prioridade::class);
    }

    public function adicionais()
    {
        return $this->hasMany(Adicional::class, "categoria_id", "id");
    }

    public function setTituloAttribute($value)
    {
        $this->attributes['titulo'] = strtoupper($value);
    }
}
