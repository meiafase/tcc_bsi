<?php

namespace App\Models;

use App\Models\Area;
use App\Models\Assunto;
use App\Models\Categoria;
use App\Models\Prioridade;
use App\Models\Status;
use App\Models\SubCategoria;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    protected $guarded = ["id"];

    public function solicitante()
    {
        return $this->hasOne(User::class, "id", "solicitante_id")->select("id", "name", "email", "tp_coord", "coord_id", "area_id");
    }

    public function responsavel()
    {
        return $this->hasOne(User::class, "id", "responsavel_id")->select("id", "name", "email", "tp_coord", "coord_id", "area_id");
    }

    public function area()
    {
        return $this->hasOne(Area::class, "id", "area_id");
    }

    public function categoria()
    {
        return $this->hasOne(Categoria::class, "id", "categoria_id")->select("id", "titulo", "descricao", "possui_adicionais");
    }

    public function subCategoria()
    {
        return $this->hasOne(SubCategoria::class, "id", "sub_categoria_id")->select("id", "titulo", "descricao", "possui_adicionais");
    }

    public function prioridade()
    {
        return $this->hasOne(Prioridade::class, "id", "prioridade_id")->select("id", "descricao");
    }

    public function assunto()
    {
        return $this->hasOne(Assunto::class, "id", "assunto_id")->select("id", "titulo", "descricao");
    }

    public function status()
    {
        return $this->hasOne(Status::class, "id", "status_id")->select("id", "descricao");
    }

    public function mensagens()
    {
        return $this->hasMany(Mensagem::class, "pedido_id", "id")->select("id", "usuario_id", "mensagem", "pedido_id", "data_criacao")->with('usuario', 'anexos');
    }

    public function historico()
    {
        return $this->hasMany(Historico::class, "pedido_id", "id");
    }

    public function avaliacao()
    {
        return $this->hasOne(Avaliacao::class, "pedido_id", "id");
    }

    public function adicionais()
    {
        return $this->hasMany(InfoAdicional::class, "pedido_id", "id")->select("id", "pedido_id", "adicional_id", "campo", "conteudo");
    }

    public function observacoes()
    {
        return $this->hasMany(Observacao::class, "pedido_id", "id")->select("id", "usuario_id", "observacao", "pedido_id", "created_at")->with('usuario');
    }
}
