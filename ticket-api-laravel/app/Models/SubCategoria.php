<?php

namespace App\Models;

use App\Models\Categoria;
use App\Models\Prioridade;
use App\Models\Adicional;
use Illuminate\Database\Eloquent\Model;

class SubCategoria extends Model
{
    protected $table = 'sub_categorias';

    protected $guarded = ["id"];

    protected $fillable = [
        "usuario_id",
        "categoria_id",
        "prioridade_id",
        "equipe_id",
        "responsavel_id",
        "titulo",
        "descricao",
        "restricao",
        "possui_adicionais",
        "prazo_horas",
        "ativo"
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function prioridade()
    {
        return $this->belongsTo(Prioridade::class);
    }

    public function adicionais()
    {
        return $this->hasMany(Adicional::class);
    }

    public function setTituloAttribute($value)
    {
        $this->attributes['titulo'] = strtoupper($value);
    }

    public function responsavel()
    {
        return $this->hasMany(User::class, "id", "responsavel_id")->select("id", "name");
    }

    public function grupo()
    {
        return $this->hasMany(Grupo::class, "id", "equipe_id")->select("id", "titulo");
    }
}
